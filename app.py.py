import streamlit as st
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import os
from uuid import uuid4

# Set page configuration
st.set_page_config(page_title="Text-to-Image Generator", layout="wide")

# Initialize session state for storing image path
if 'image_path' not in st.session_state:
    st.session_state.image_path = None

# Create a directory to save generated images
if not os.path.exists("generated_images"):
    os.makedirs("generated_images")

# Load the Stable Diffusion model
@st.cache_resource
def load_model():
    model_id = "stabilityai/stable-diffusion-2-1"
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    if torch.cuda.is_available():
        pipe = pipe.to("cuda")
    return pipe

# Streamlit UI
st.title("Stable Diffusion Text-to-Image Generator")
st.write("Enter a prompt to generate an image using Stable Diffusion.")

# Text input for prompt
prompt = st.text_input("Prompt", placeholder="e.g., A futuristic city at sunset", key="prompt")

# Generate button
if st.button("Generate Image"):
    if prompt:
        with st.spinner("Generating image... This may take a moment."):
            try:
                # Load model
                pipe = load_model()
                
                # Generate image
                image = pipe(prompt).images[0]
                
                # Save image with unique filename
                image_id = str(uuid4())
                image_path = f"generated_images/{image_id}.png"
                image.save(image_path)
                st.session_state.image_path = image_path
                
                # Display success message
                st.success("Image generated successfully!")
            except Exception as e:
                st.error(f"Error generating image: {str(e)}")
    else:
        st.error("Please enter a prompt.")

# Display the generated image if available
if st.session_state.image_path:
    st.image(st.session_state.image_path, caption="Generated Image", use_column_width=True)

# Add a note about requirements
st.markdown("""
**Note**: This app requires a GPU-enabled environment and the following packages: 
`streamlit`, `torch`, `diffusers`, `transformers`. Ensure they are installed in your environment.
""")