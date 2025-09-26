'use client'

interface ResultsPanelProps {
  results: {
    diagnosis: string
    confidence: number
    alternativeDiagnoses: Array<{
      condition: string
      confidence: number
    }>
    recommendations: string[]
  }
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-red-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-red-50'
    if (confidence >= 0.6) return 'bg-yellow-50'
    return 'bg-green-50'
  }

  return (
    <div className="medical-panel p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        AI Analysis Results
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Diagnosis */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <img 
                src="/icons/diagnosis-icon.svg" 
                alt="Diagnosis Icon" 
                className="w-6 h-6 mr-2"
              />
              Primary Diagnosis
            </h3>
            <div className={`p-6 rounded-xl border-2 ${getConfidenceBgColor(results.confidence)} border-opacity-50 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getConfidenceColor(results.confidence).replace('text-', 'bg-')} animate-pulse`}></div>
                  <span className="text-2xl font-bold text-gray-900">
                    {results.diagnosis}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-3xl font-bold ${getConfidenceColor(results.confidence)}`}>
                    {(results.confidence * 100).toFixed(1)}%
                  </span>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    results.confidence >= 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    results.confidence >= 0.6 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                  style={{ width: `${results.confidence * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {results.confidence >= 0.8 ? 'High Risk - Immediate attention required' :
                 results.confidence >= 0.6 ? 'Medium Risk - Monitor closely' : 
                 'Low Risk - Regular monitoring recommended'}
              </div>
            </div>
          </div>

          {/* Alternative Diagnoses */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Alternative Diagnoses
            </h3>
            <div className="space-y-3">
              {results.alternativeDiagnoses.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      {alt.condition}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-700">
                      {(alt.confidence * 100).toFixed(1)}%
                    </span>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${alt.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Recommendations
          </h3>
          <div className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.725-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This AI analysis is for research and educational purposes only. 
              It should not replace professional medical diagnosis. Please consult with a qualified 
              dermatologist for proper medical evaluation and treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Powered by Flower */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500">Powered by</div>
        <div className="flex items-center justify-center space-x-2">
          <img 
            src="/icons/flower-logo.svg" 
            alt="Flower Logo" 
            className="w-5 h-5"
          />
          <div className="text-sm font-semibold text-blue-600">Flower</div>
        </div>
      </div>
    </div>
  )
}
