# Dermatology AI Interface

A modern, clinical-style web interface for AI-powered dermatology analysis built with Next.js and Tailwind CSS.

## Features

- **Full Body Image Upload**: Upload a full body image to mark lesion locations
- **Skin Close-up Images**: Upload up to 2 skin close-up images for detailed analysis
- **AI Inference**: Simulated AI analysis with confidence scores and recommendations
- **Clinical UI Design**: Clean, hospital-style interface with medical color scheme
- **Responsive Layout**: Optimized for desktop displays (1920x1080)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Images**:
   - Upload a full body image in the left panel
   - Upload 2 skin close-up images in the right panel

2. **Run Analysis**:
   - Click the "Inference" button to start AI analysis
   - Wait for the analysis to complete (simulated 2-second delay)

3. **View Results**:
   - Review the primary diagnosis with confidence score
   - Check alternative diagnoses
   - Read AI recommendations

## Project Structure

```
dermatology-interface/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── BodyImagePanel.tsx   # Full body image upload panel
│   ├── ImageUpload.tsx      # Reusable image upload component
│   ├── ResultsPanel.tsx     # AI analysis results display
│   └── SkinImagePanel.tsx   # Skin close-up images panel
├── public/
│   └── placeholders/        # Placeholder images
└── package.json
```

## Customization

- **Replace Placeholder Images**: Update the SVG files in `public/placeholders/`
- **Modify AI Results**: Edit the mock results in `app/page.tsx`
- **Styling**: Customize colors and layout in `tailwind.config.js` and component files

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects

## Disclaimer

This is a prototype interface for demonstration purposes. The AI analysis is simulated and should not be used for actual medical diagnosis. Always consult with qualified medical professionals for real medical conditions.
