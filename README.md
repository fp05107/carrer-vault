# Career Vault - Advanced Job Application Tracker

Career Vault is a powerful, developer-first command center for managing your job search. Track applications, visualize your progress, and manage your resumes with military-grade precision.

![Career Vault Dashboard Preview](https://github.com/user-attachments/assets/placeholder)

## 🚀 Features

-   **Application Tracking**: Log every job application with details like Company, Role, Status, and Job Description.
-   **Resume Operations**: 
    -   Host resumes securely on the cloud.
    -   **Resume Builder**: Write resumes in **LaTeX** directly in your browser.
    -   **Auto-Compile**: Instantly preview and download production-ready PDFs.
-   **Analytics Dashboard**: Real-time visualization of your interview pipeline and success rates.
-   **Smart Actions**: 
    -   Quick access to "View Job Description" for interview prep.
    -   One-click application management.
-   **Secure & Fast**: Built with Next.js 14, securely authenticated, and optimized for speed.

## 🛠️ Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Database**: MongoDB (via Prisma ORM)
-   **Styling**: Tailwind CSS + ShadCN UI
-   **Storage**: Cloudinary (for Resume Hosting)
-   **Auth**: NextAuth.js (v5)

## ⚡ Getting Started

First, clone the repository and install dependencies:

```bash
npm install
```

Set up your `.env` file with the following keys:

```env
DATABASE_URL="mongodb+srv://..."
AUTH_SECRET="your_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
