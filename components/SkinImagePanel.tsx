'use client'

import ImageUpload from './ImageUpload'

interface SkinImagePanelProps {
  image: string | null
  onImageUpload: (image: string, file?: File) => void
}

export default function SkinImagePanel({ image, onImageUpload }: SkinImagePanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Skin Close-up Image</h3>
      
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Skin close-up"
            className="w-full h-64 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={() => onImageUpload('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <div className="text-gray-500">
            <img 
              src="/placeholders/skin-placeholder.svg" 
              alt="Skin placeholder"
              className="mx-auto h-32 w-48 mb-4"
            />
            <p className="text-sm mb-4">Upload a skin close-up image for analysis</p>
            <ImageUpload
              onImageUpload={onImageUpload}
              label="Skin close-up image"
            />
          </div>
        </div>
      )}
    </div>
  )
}
