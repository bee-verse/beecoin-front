# 3D Models Directory

## Adding the Bee 3D Model

To use the 3D bee model in the application, please add your .glb file here with the following specifications:

1. Name the file `bee.glb`
2. Place it directly in this directory (`public/models/`)
3. The model should be properly centered and oriented
4. For best results, the model should have a neutral pose

## Generate a Simple Placeholder Model

If you don't have a 3D model ready, you can generate a simple placeholder:

1. Open http://localhost:5173/generate-model.html in your browser
2. Click the "Download Model" button
3. Save the file as `bee.glb` in this directory

## Model Requirements

- Format: GLB (Binary GL Transmission Format)
- Recommended poly count: Keep under 50k polygons for mobile performance
- Textures: Embedded in the GLB file
- Animations: Not required, as the application handles rotation and animation

Once you've added the model file, the application will automatically load it and display it on the home page.

## Current Status

A built-in fallback 3D bee model is currently displayed until you provide your own model file.