# Hyre – AI Resume Generator

Hyre is an AI-powered resume generator built using **React**, **Vite**, **Tailwind CSS**, and the **Hugging Face Inference API**.  
It lets users enter their personal and professional details, generates a clean ATS-friendly resume, shows a live preview, and allows PDF download.

---

## 🚀 Features

- 🔥 **AI-generated resumes** using Hugging Face LLMs  
- 📄 **Live preview** of the generated resume  
- 📥 **One-click PDF download** (html2pdf.js)  
- 🎨 **Clean and responsive UI** powered by Tailwind CSS  

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **React.js** | UI framework |
| **Tailwind CSS** | Styling |
| **Hugging Face API** | AI resume generation |
| **html2pdf.js** | PDF export |
| **React Router** | Routing |

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/hyre.git
cd hyre
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Create environment file
```bash
Create a .env file in the project root:
VITE_HF_TOKEN=your_huggingface_api_key
```
### 4️⃣ Start the app
```bash
npm run dev
```
# 🤖 AI Model Used
Default model:
```
Qwen/Qwen2.5-7B-Instruct
```
# 📘 How It Works
- User fills out fields (About, Education, Skills, Projects, Certifications, etc.)
- Text is sent to Hugging Face API
- Model generates ATS-friendly resume
- Live preview updates instantly
- User downloads PDF

🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first.

📄 License
MIT License © 2025