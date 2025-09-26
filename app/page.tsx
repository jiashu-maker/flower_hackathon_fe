'use client'

import { useState } from 'react'
import BodyImagePanel from '@/components/BodyImagePanel'
import SkinImagePanel from '@/components/SkinImagePanel'
import ResultsPanel from '@/components/ResultsPanel'

export default function Home() {
  const [lesionPositions, setLesionPositions] = useState<Array<{ x: number; y: number; id: string }>>([])
  const [skinImage, setSkinImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [inferenceResults, setInferenceResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (imageDataUrl: string, file?: File) => {
    setSkinImage(imageDataUrl)
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleInference = async () => {
    if (!uploadedFile) {
      alert('Please upload a skin image for analysis')
      return
    }
    console.log('uploadedFile', uploadedFile)
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('http://0.0.0.0:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Transform the API response to match our expected format
      const transformedResults = {
        diagnosis: data.predictions[data.predicted_class_index].class_name,
        confidence: data.predictions[data.predicted_class_index].confidence,
        alternativeDiagnoses: data.predictions
          .filter((_: any, index: number) => index !== data.predicted_class_index)
          .sort((a: any, b: any) => b.confidence - a.confidence)
          .map((pred: any) => ({
            condition: pred.class_name,
            confidence: pred.confidence
          })),
        recommendations: generateRecommendations(data.predictions[data.predicted_class_index])
      }

      setInferenceResults(transformedResults)
    } catch (error) {
      console.error('Error during inference:', error)
      alert('Error during analysis. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const generateRecommendations = (primaryPrediction: any) => {
    const recommendations = []
    
    if (primaryPrediction.class_name === 'melanoma') {
      recommendations.push('Immediate dermatologist consultation recommended')
      recommendations.push('Consider biopsy for definitive diagnosis')
      recommendations.push('Monitor for any changes in size or color')
    } else if (primaryPrediction.class_name === 'basal cell carcinoma') {
      recommendations.push('Schedule dermatologist appointment within 2-4 weeks')
      recommendations.push('Consider surgical removal if confirmed')
      recommendations.push('Regular skin checks recommended')
    } else if (primaryPrediction.class_name === 'melanocytic nevi') {
      recommendations.push('Regular monitoring recommended')
      recommendations.push('Annual dermatologist check-up')
      recommendations.push('Watch for changes in size, color, or shape')
    } else {
      recommendations.push('Regular monitoring recommended')
      recommendations.push('Annual dermatologist check-up')
      recommendations.push('Continue good sun protection practices')
    }

    return recommendations
  }

  return (
    <div className="min-h-screen bg-medical-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Dermatology AI Analysis Interface
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Mark lesion locations and upload skin images for AI analysis
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Powered by</div>
            <div className="text-lg font-semibold text-blue-600">Flower</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Panel - Body Scan with Lesion Markers */}
            <div className="medical-panel p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Body Scan with Lesion Markers
              </h2>
              <BodyImagePanel 
                lesionPositions={lesionPositions}
                onLesionPositionsChange={setLesionPositions}
              />
            </div>

            {/* Right Panel - Skin Close-up Image */}
            <div className="medical-panel p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Skin Close-up Image
              </h2>
              <SkinImagePanel 
                image={skinImage}
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>

          {/* Inference Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleInference}
              disabled={!uploadedFile || isLoading}
              className="px-8 py-3 bg-medical-blue text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Analyzing...' : 'Inference'}
            </button>
          </div>

          {/* Results Panel */}
          {inferenceResults && (
            <ResultsPanel results={inferenceResults} />
          )}
        </div>
      </div>
    </div>
  )
}
