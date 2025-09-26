'use client'

import { useState } from 'react'
import BodyImagePanel from '@/components/BodyImagePanel'
import SkinImagePanel from '@/components/SkinImagePanel'
import ResultsPanel from '@/components/ResultsPanel'

export default function Home() {
  const [lesionPositions, setLesionPositions] = useState<Array<{ x: number; y: number; id: string }>>([])
  const [skinImage, setSkinImage] = useState<string | null>(null)
  const [inferenceResults, setInferenceResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInference = async () => {
    if (!skinImage) {
      alert('Please upload a skin image for analysis')
      return
    }

    setIsLoading(true)
    
    // Simulate AI inference delay
    setTimeout(() => {
      const mockResults = {
        diagnosis: 'Melanoma',
        confidence: 0.87,
        alternativeDiagnoses: [
          { condition: 'Nevus', confidence: 0.12 },
          { condition: 'Basal Cell Carcinoma', confidence: 0.01 }
        ],
        recommendations: [
          'Immediate dermatologist consultation recommended',
          'Consider biopsy for definitive diagnosis',
          'Monitor for any changes in size or color'
        ]
      }
      setInferenceResults(mockResults)
      setIsLoading(false)
    }, 2000)
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
                onImageUpload={setSkinImage}
              />
            </div>
          </div>

          {/* Inference Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleInference}
              disabled={!skinImage || isLoading}
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
