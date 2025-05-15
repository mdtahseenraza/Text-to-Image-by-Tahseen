# 🖼️ Text to Image Generator

Transform your imagination into stunning visuals with this advanced AI-powered image generation web app.

Built using **React.js (Node.js)** for the frontend and **Stable Diffusion with LoRA** in Python notebooks, this tool lets users turn detailed text prompts into stunning AI-generated images.

---

## 🌐 Live Demo

🔗 [Try the App](https://text-to-image-tahseen-raza.netlify.app)

---

## ✨ Features

- 🎨 Text-to-Image generation with Stable Diffusion + LoRA
- ✍️ Supports:
  - Prompt & Negative Prompt
  - Custom Width and Height
  - Guidance Scale
  - Denoising Steps
  - Seed control with randomizer
- 📜 Generation history tracking
- 💻 Built with React and Tailwind CSS
- 📷 Preview output instantly

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Node.js          |
| AI Model    | Python Notebook, Stable Diffusion, LoRA  |
| Libraries   | PyTorch, HuggingFace Diffusers           |
| Hosting     | Netlify (Frontend)                       |
| Interface   | Web-based UI                             |

---

## 🚀 How to Run Locally

### 📁 1. Clone the Repository

```bash
git clone https://github.com/yourusername/text-to-image-generator.git
cd text-to-image-generator

⚙️ 2. Run React Frontend (Node.js)
bash
Copy
Edit
cd client
npm install
npm start
Navigate to http://localhost:3000

✅ Make sure Node.js and npm are installed on your system.

🧠 3. Run Stable Diffusion Model
Go to notebooks/

Open stable_diffusion_lora.ipynb in Google Colab or Jupyter Notebook

Run the cells

Input Prompt, Negative Prompt, Width, Height, Steps, Guidance Scale, and Seed

View or download the generated image

📸 Example Prompt
Prompt:

csharp
Copy
Edit
A magical forest with glowing mushrooms and fairies, cinematic lighting, ultra-detailed, fantasy style
Negative Prompt:

arduino
Copy
Edit
blurry, low quality, distorted, text artifacts
📂 Folder Structure
bash
Copy
Edit
text-to-image-generator/
├── client/                     # React Frontend
│   └── src/components/         # UI Components
├── notebooks/                  # Python Notebook for AI
│   └── stable_diffusion_lora.ipynb
├── public/                     # Static Assets
├── README.md                   # Project Documentation
🙋‍♂️ Author
Md. Tahseen Raza

🔗 Portfolio

💼 LinkedIn

💻 GitHub

