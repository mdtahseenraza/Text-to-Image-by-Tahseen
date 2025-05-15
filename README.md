# 🖼️ Text to Image Generator

Transform your imagination into stunning visuals with this advanced AI-powered image generation web app built using **React.js (Node.js)** and **Stable Diffusion + LoRA and flux** in Python.

## 🌐 Live Demo

👉 [Live Project](https://text-to-image-tahseen-raza.netlify.app)

---

## 📌 Overview

This web application enables users to generate high-quality images  images from natural language prompts using **Stable Diffusion** enhanced with **LoRA (Low-Rank Adaptation)**. The frontend is built with **React.js (Node.js)**, and image generation is powered by a Python notebook.

Users can fine-tune image generation with advanced parameters:
- 📏 Width & Height
- 🎯 Guidance Scale
- 🌀 Denoising Steps
- 🎲 Seed Value
- 🚫 Negative Prompt

---

## ✨ Features

- 🔥 Generate stunning AI images from text prompts
- 🎛️ Advanced generation controls:
  - Prompt & Negative Prompt
  - Custom Width & Height
  - Denoising Steps & Guidance Scale
  - Seed control with randomization
- 📜 View generation history
- ⚡ Fast, intuitive UI with React.js
- 💡 Tips for crafting high-quality prompts

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Node.js
- **Backend/AI Model**: Python Notebook (`.ipynb`), Stable Diffusion, LoRA, HuggingFace Diffusers, PyTorch
- **Deployment**:
  - Frontend hosted on **Netlify**
  - Notebook runs in **Jupyter Notebook** or **Google Colab**

---

## 🚀 How to Run the Project Locally

### 📁 1. Clone the Repository

Clone the repository to your local machine using the following commands:

```bash
git clone https://github.com/yourusername/text-to-image-generator.git
cd text-to-image-generator
###  ⚙️ 2. Run the React Frontend
cd client
npm install
npm start

Visit http://localhost:3000 in your browser.
Prerequisite: Ensure Node.js and npm are installed.
🧠 3. Run the Stable Diffusion Notebook
Navigate to the notebooks/ folder.
Open stable_diffusion_lora.ipynb in Jupyter Notebook or Google Colab.
Run all cells, input your Prompt, Negative Prompt, and parameters (width, height, steps, guidance scale, seed).
View and download the generated image.
🧪 Example Prompt
Prompt: "A magical forest with glowing mushrooms and fairies, cinematic lighting, ultra-detailed, fantasy style"
Negative Prompt: "blurry, low quality, distorted, text artifacts"

### 📂 Project Structure
text-to-image-generator/
├── client/                     # React Frontend (Node.js)
│   └── src/components/         # UI components
├── notebooks/                  # AI logic in Python
│   └── stable_diffusion_lora.ipynb
├── public/                     # Static assets
├── README.md                   # Project documentation
