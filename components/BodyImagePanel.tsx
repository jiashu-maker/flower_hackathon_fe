'use client'

interface BodyImagePanelProps {
  lesionPositions: Array<{ x: number; y: number; id: string }>
  onLesionPositionsChange: (positions: Array<{ x: number; y: number; id: string }>) => void
}

export default function BodyImagePanel({ lesionPositions, onLesionPositionsChange }: BodyImagePanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Body Scan with Pre-marked Lesions</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          5 lesions detected
        </div>
      </div>

      <div className="relative w-full h-96 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        {/* Body Scan Image with Pre-marked Lesions */}
        <img
          src="/body-scan.svg"
          alt="Body scan with lesion markers"
          className="w-full h-full object-contain"
        />
        
        {/* Overlay Information */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
          <div className="text-xs">
            <div className="font-semibold mb-1">Detected Lesions:</div>
            <div className="space-y-1 text-xs">
              <div>• Head region (1)</div>
              <div>• Chest area (1)</div>
              <div>• Left arm (1)</div>
              <div>• Right leg (1)</div>
              <div>• Back region (1)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
        <div className="font-medium text-blue-800 mb-1">Lesion Detection Complete</div>
        <div className="text-blue-700">
          AI has automatically identified 5 potential skin lesions on the body scan. 
          Upload a close-up image of any marked area for detailed analysis.
        </div>
      </div>
    </div>
  )
}
