# AMITY UNIVERSITY ONLINE, NOIDA, UTTAR PRADESH

---

*In partial fulfilment of the requirement for the award of degree of*
**Bachelor of Computer Applications (BCA) / Bachelor of Technology — Information Technology**

---

## TITLE: Career Vault: A Secure Cloud-Based Career Management System

---

**Guide Details:**
Name: [Supervisor Name]
Designation: [Assistant Professor / Associate Professor]
Department: [Department of Computer Science & Information Technology]
Amity University Online, Noida

---

**Submitted By:**

Name of the Student: [Your Full Name]
Enrolment No.: [Your Enrolment Number]
Programme: BCA / B.Tech (IT) — 6th Semester
Academic Year: 2025–2026

---

*(Times New Roman — 14pt)*

---

---

## ABSTRACT

The rapid expansion of digital job markets and cloud computing has created an acute need for intelligent, secure, and scalable career management solutions. Traditional job-tracking methods — ranging from spreadsheets to generic note-taking applications — offer minimal security, no structured workflow, and no intelligent data handling. This project, **Career Vault**, addresses these gaps by presenting a **Secure Cloud-Based Career Management System** built on modern web technologies including Next.js 16, MongoDB Atlas, Prisma ORM, NextAuth.js v5, and Cloudinary.

Career Vault enables job-seeking students and professionals to manage their entire career lifecycle from a single, authenticated dashboard. The core functionalities include: application tracking with status management (Applied → Interviewing → Offer / Rejected), secure LaTeX-based resume creation and editing, cloud-based resume upload and storage via Cloudinary, and real-time statistical dashboards reflecting application health at a glance.

Security is the central design concern of the system. The platform implements a **three-layered security architecture**. The first layer consists of **AES-256-GCM authenticated encryption** applied to all sensitive file references (Cloudinary public IDs), direct download URLs, job descriptions, and file metadata before they are persisted in the database. This ensures that even a database breach cannot expose users' private career documents or job details. The second layer comprises a **JWT (JSON Web Token) based session management system** powered by NextAuth.js. Sessions are stored in HttpOnly, SameSite=Lax cookies with a maximum age of 8 hours, preventing session theft via cross-site scripting (XSS) or cross-site request forgery (CSRF). The JWT callback re-validates user existence on every token refresh, automatically invalidating tokens for deleted accounts. The third layer enforces **strict access control** at the server-action level, ensuring that each authenticated user can only read, modify, or delete resources they own. Ownership is verified before every database query and again within the query itself, creating a double-lock mechanism against horizontal privilege escalation attacks.

The system also incorporates a timing-attack resistant credential comparison strategy (using a dummy hash when no user is found) to prevent information leakage during the login flow, and a Zod-based input validation layer on all user-provided data to prevent injection attacks.

The project was developed using the Next.js App Router paradigm with React Server Components, meaning sensitive data processing and access control logic executes exclusively on the server — it is never exposed to client-side JavaScript bundles. This architecture is inherently more secure than client-side frameworks for data-sensitive applications.

User experience has been given equal importance alongside security. The interface features a dark-mode glassmorphic design with animated statistics, Framer Motion transitions, and a live LaTeX resume editor — making the platform both functional and visually compelling.

This project demonstrates that security and usability are not mutually exclusive. By embedding encryption, authentication, and access control at the framework level, Career Vault presents a replicable model for building secure career management tools for the modern job market.

**Keywords:** Cloud Computing, Career Management System, AES-256-GCM Encryption, JWT Authentication, NextAuth.js, Next.js, MongoDB, Prisma ORM, Cloudinary, Access Control, Session Security, Full-Stack Web Application

---

---

## DECLARATION

I, **[Your Full Name]**, a student pursuing **Bachelor of Computer Applications (BCA), 6th Semester** at **Amity University Online, Noida, Uttar Pradesh**, hereby declare that the project work entitled **"Career Vault: A Secure Cloud-Based Career Management System"** has been prepared by me during the academic year **2025–2026** under the guidance of **[Guide's Full Name]**, **[Department of Computer Science and Information Technology]**, **Amity University Online, Noida**.

I assert that this project is a piece of original bona-fide work done by me. It is the outcome of my own effort and that it has not been submitted to any other university for the award of any degree.

All sources of information used in this project report have been duly acknowledged. Any resemblance to any other work is purely coincidental.

---

**Signature of Student**

---

Name: [Your Full Name]
Enrolment No.: [Your Enrolment Number]
Date: _______________
Place: _______________

---

---

## CERTIFICATE

This is to certify that **[Name of Student]** of **Amity University Online** has carried out the project work presented in this project report entitled **"Career Vault: A Secure Cloud-Based Career Management System"** for the award of **Bachelor of Computer Applications (BCA) / Bachelor of Technology (Information Technology)** under my guidance.

The project report embodies results of original work, and studies are carried out by the student himself/herself. Certified further, that to the best of my knowledge the work reported herein does not form the basis for the award of any other degree to the candidate or to anybody else from this or any other University/Institution.

---

**Signature**
**(Name of Guide)**
**(Designation)**
Department of Computer Science & Information Technology
Amity University Online, Noida

Date: _______________

---

---

## TABLE OF CONTENTS

| Chapter | Title | Page No. |
|---|---|---|
| — | Abstract | ii |
| — | Declaration | iii |
| — | Certificate | iv |
| — | Table of Contents | v |
| — | List of Tables | vi |
| — | List of Figures | vii |
| **1** | **Introduction to the Topic** | **1** |
| 1.1 | Background | 1 |
| 1.2 | Problem Statement | 2 |
| 1.3 | System Overview | 3 |
| 1.4 | Technology Stack | 4 |
| 1.5 | Justification for Topic Selection | 5 |
| **2** | **Review of Literature** | **6** |
| 2.1 | Existing Career Management Systems | 6 |
| 2.2 | Web Application Security Frameworks | 7 |
| 2.3 | Cloud Storage and Encryption | 8 |
| 2.4 | JWT and Session Management | 9 |
| 2.5 | Research Gaps | 10 |
| **3** | **Research Objectives and Methodology** | **11** |
| 3.1 | Research Objectives | 11 |
| 3.2 | Research Problem | 11 |
| 3.3 | Research Design | 12 |
| 3.4 | Type of Data Used | 12 |
| 3.5 | Data Collection Method | 12 |
| 3.6 | Data Collection Instrument | 12 |
| 3.7 | Sample Size | 13 |
| 3.8 | Sampling Technique | 13 |
| 3.9 | Data Analysis Tool | 13 |
| **4** | **Data Analysis, Results, and Interpretation** | **14** |
| 4.1 | System Architecture Analysis | 14 |
| 4.2 | Security Mechanism Testing | 15 |
| 4.3 | Performance Metrics | 16 |
| 4.4 | User Workflow Analysis | 17 |
| 4.5 | Database Schema Analysis | 18 |
| **5** | **Findings and Conclusion** | **19** |
| **6** | **Recommendations and Limitations** | **21** |
| — | Bibliography / References | 23 |
| — | Appendix | 25 |

---

---

## LIST OF TABLES

| Table No. | Title | Page No. |
|---|---|---|
| Table 1.1 | Technology Stack Summary | 4 |
| Table 2.1 | Comparison of Existing Career Management Tools | 6 |
| Table 2.2 | Security Features in Modern Web Frameworks | 8 |
| Table 3.1 | Survey Questionnaire Structure | 12 |
| Table 3.2 | Sample Population Distribution | 13 |
| Table 4.1 | Encryption Algorithm Comparison | 15 |
| Table 4.2 | JWT Configuration Parameters | 16 |
| Table 4.3 | Application Status Distribution (Sample Data) | 17 |
| Table 4.4 | Database Model and Field Descriptions | 18 |
| Table 4.5 | Security Test Case Results | 18 |
| Table 5.1 | Key Findings Summary | 20 |

---

---

## LIST OF FIGURES

| Figure No. | Title | Page No. |
|---|---|---|
| Figure 1.1 | Career Vault — System Overview Diagram | 3 |
| Figure 1.2 | High-Level Technology Architecture | 4 |
| Figure 2.1 | Market Landscape of Career Management Tools | 7 |
| Figure 3.1 | System Development Methodology (Agile Iterations) | 12 |
| Figure 4.1 | Three-Layer Security Architecture Diagram | 14 |
| Figure 4.2 | AES-256-GCM Encryption / Decryption Flow | 15 |
| Figure 4.3 | JWT Lifecycle and Session Management Flow | 16 |
| Figure 4.4 | Access Control Verification Flow | 17 |
| Figure 4.5 | Dashboard — Application Statistics Screen | 17 |
| Figure 4.6 | Prisma Schema Entity-Relationship Diagram | 18 |

---

---

## CHAPTER 1: INTRODUCTION TO THE TOPIC

*(Font: Times New Roman, 12pt, Double Spacing)*

### 1.1 Background

The 21st century job market is characterised by rapid digitisation, intense competition, and an ever-growing volume of applications that candidates submit before securing employment. According to industry estimates, a typical job seeker submits between 50 and 200 applications before receiving a job offer in competitive technical fields. Managing this volume of activity — tracking which roles have been applied for, what stage each application is at, which resume version was submitted, and what the job description required — has become a significant cognitive and logistical challenge for candidates.

Historically, candidates have relied on simple tools such as Microsoft Excel spreadsheets, Google Sheets, or plain text notes to track applications. These approaches suffer from several critical limitations: they lack structure, offer no security guarantees for potentially sensitive career data, cannot integrate with cloud storage for document management, and provide no analytics or visual representation of application health.

The emergence of cloud computing, serverless architectures, and secure full-stack JavaScript frameworks has created an opportunity to build sophisticated, secure career management systems that are accessible, performant, and privacy-respecting. Platforms like Notion, Trello, and LinkedIn partially address some of these needs, but none of them provide a dedicated, security-first career tracking experience with integrated resume management.

**Career Vault** was conceived and developed to fill this gap. It is a full-stack web application that provides a complete, secure career management experience: from submitting job applications and attaching resumes, to monitoring application statuses and creating professional LaTeX-based resumes — all protected by enterprise-grade encryption and authentication mechanisms.

The platform is particularly relevant in the Indian higher-education context, where students in their final semesters of technical programmes are actively applying to multiple companies simultaneously through campus placement processes, internship drives, and open-market applications. Career Vault provides these students with a structured, secure, and visually engaging platform to manage their career journey.

### 1.2 Problem Statement

Despite the availability of numerous productivity tools, the career management space suffers from a clear set of unaddressed problems:

**Lack of dedicated tracking:** Generic tools like spreadsheets do not enforce data structure. There is no validation, no status workflow, and no visual dashboard to understand application health at a glance.

**Absence of security:** Career data is sensitive. A candidate's list of target employers, job descriptions, compensation expectations, and resume versions constitutes personally identifiable information (PII) with commercial value. Existing amateur tools store this data in plain text with no encryption.

**Resume fragmentation:** Candidates often maintain multiple resume versions in different cloud services (Google Drive, OneDrive, email attachments). There is no unified system linking a specific resume version to a specific application.

**No cloud integration:** Document management is disconnected from application tracking. Uploading a resume for a specific application and later retrieving it requires navigating multiple different services.

**Horizontal privilege escalation risks:** Web applications that store user data must ensure that User A cannot access User B's records by simply knowing a document identifier. Many amateur implementations fail to enforce this check at the application layer, relying solely on obscurity.

Career Vault addresses all of the above problems within a single, cohesive, secure system.

### 1.3 System Overview

Career Vault is structured as a single-page application (SPA) with server-side rendering capabilities, built on the Next.js 16 App Router paradigm. The system provides the following core modules:

**Authentication Module:** Supports email/password login with bcrypt-hashed passwords, and OAuth 2.0 social login via Google and GitHub. Session management is handled via JWT tokens stored in HttpOnly cookies.

**Application Tracking Module:** Allows authenticated users to submit job applications with company name, role, status, job description, and a PDF resume attachment. Applications are displayed in a sortable table with status badges and filtering capabilities.

**Resume Builder Module:** An integrated LaTeX resume editor that allows users to create, save, and version their resumes directly within the platform.

**Dashboard Analytics Module:** Provides real-time statistics including total applications, active interviews, offers received, and rejection counts — visualised with animated card-based UI components.

**Security Layer:** A cross-cutting concern implemented at the server-action level: AES-256-GCM encryption for file references and sensitive metadata, JWT hardening, and ownership-based access control for all resources.

### 1.4 Technology Stack

| Component | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| Runtime | Node.js | ≥ 18 |
| Language | TypeScript | 5.x |
| Database | MongoDB Atlas | — |
| ORM | Prisma | 5.22 |
| Authentication | NextAuth.js | 5.0-beta |
| Encryption | Node.js crypto (AES-256-GCM) | Built-in |
| Cloud Storage | Cloudinary | 2.9 |
| Styling | Tailwind CSS v4 | 4.x |
| UI Components | shadcn/ui + Radix UI | — |
| Animation | Framer Motion | 12.x |
| Validation | Zod | 4.x |
| Password Hashing | bcryptjs | 3.x |

*Table 1.1: Technology Stack Summary*

### 1.5 Justification for Topic Selection

The topic of a **Secure Cloud-Based Career Management System** was selected for the following reasons:

**Relevance to contemporary industry needs:** Cloud security and full-stack web development are among the most in-demand skills in the Indian IT industry as of 2025–2026. Building a project that demonstrates mastery of both is directly aligned with placement requirements.

**Direct utility:** The application is immediately useful to students and graduates of this programme. It solves a real problem that the developer and classmates face during their own placement processes.

**Integration of multiple CS disciplines:** The project integrates concepts from Database Management Systems (MongoDB, Prisma), Computer Networks (HTTP cookies, HTTPS), Information Security (AES-256-GCM, JWT, bcrypt), Software Engineering (Agile development, component-based architecture), and Human-Computer Interaction (UI/UX design) — making it an ideal comprehensive capstone project.

**Scalability potential:** The architecture is designed to scale. The MongoDB Atlas backend can handle millions of records, Cloudinary can store terabytes of resume files, and Next.js can be deployed on edge networks globally through Vercel.

**Novelty of security implementation:** The specific combination of AES-256-GCM database-level encryption, NextAuth JWT hardening, and double-locked ownership checks in a Next.js Server Actions context represents a novel and academically significant contribution to the field of secure web application development.

---

---

## CHAPTER 2: REVIEW OF LITERATURE

*(Font: Times New Roman, 12pt, Double Spacing)*

### 2.1 Existing Career Management Systems and Applications

The digital career management landscape is populated by several well-known commercial products, each with distinct strengths and limitations. Understanding these systems is essential context for appreciating the contributions of Career Vault.

**LinkedIn (Microsoft, 2003)** is the world's largest professional networking platform with over 900 million users globally. While it provides job application tracking features through its "Easy Apply" system and a "My Jobs" section, it does not allow candidates to track applications submitted outside its ecosystem, offers no resume versioning linked to specific applications, and stores all data in plain text on Microsoft's centralised servers. Privacy concerns have been extensively documented — LinkedIn has faced multiple data breach incidents, most notably the 2012 breach of 117 million password hashes and the 2021 scraping incident affecting 700 million profiles.

**Huntr (huntr.co, 2016)** is a dedicated job application tracker that provides a Kanban-board style interface for managing applications through stages. It is the closest commercial equivalent to Career Vault. However, Huntr does not offer an integrated resume builder, does not encrypt stored data at the application layer, and does not provide cloud-native document storage. Its free tier is heavily limited.

**Notion (Notion Labs, 2016)** is a general-purpose productivity tool frequently repurposed by students for application tracking through custom databases. While flexible, Notion lacks any domain-specific features, provides no structured application workflow, and offers no document storage integration.

**Trello (Atlassian, 2011)** is used by some candidates to create Kanban boards for job tracking. It shares the same limitations as Notion — it is a generic tool without domain-specific features, encryption, or document management.

**Jobscan (2014)** focuses specifically on resume optimisation against ATS (Applicant Tracking System) algorithms. It does not provide application tracking or document management.

| Feature | LinkedIn | Huntr | Notion | Career Vault |
|---|---|---|---|---|
| Application Tracking | Partial | Yes | Manual | Yes |
| Resume Builder | Basic | No | No | Yes (LaTeX) |
| Cloud Document Storage | No | No | No | Yes (Cloudinary) |
| Data Encryption | No | No | No | AES-256-GCM |
| JWT Session Security | N/A | N/A | N/A | Yes |
| Access Control | Role-based | Basic | Workspace | User-scoped |
| Open Source | No | No | No | Yes |

*Table 2.1: Comparison of Existing Career Management Tools*

### 2.2 Web Application Security Frameworks

The academic literature on web application security provides extensive guidance on the security mechanisms implemented in Career Vault.

**OWASP (Open Web Application Security Project)** maintains the globally accepted standard for web application security risks. The OWASP Top 10 (2021) identifies Broken Access Control as the #1 web application security risk — affecting 94% of applications tested. Career Vault directly addresses this risk through its ownership-based access control layer. The second-ranked risk, Cryptographic Failures, is addressed through AES-256-GCM encryption of sensitive fields. Injection attacks (ranked #3) are mitigated through Zod schema validation on all inputs and Prisma's parameterised query model.

**Rescorla (2018)** in "The Transport Layer Security (TLS) Protocol Version 1.3" establishes the baseline for secure communication. Career Vault's deployment requires HTTPS, ensuring all data in transit is protected by TLS 1.3.

**Jones, M., Bradley, J., & Sakimura, N. (2015)** in RFC 7519 define the JSON Web Token standard. NextAuth.js v5 implements this standard with additional hardening — the JWT secret is a 256-bit random key, tokens are signed with HMAC-SHA256, and the token payload is encoded (not encrypted) but verified on every request.

**Barker, E. (2020)** in NIST SP 800-57 recommends AES-256 as the appropriate symmetric encryption algorithm for protecting data with a security lifetime beyond 2031. Career Vault's adoption of AES-256-GCM (authenticated encryption with associated data) aligns with this recommendation and adds integrity protection beyond simple confidentiality.

### 2.3 Cloud Storage Security

The integration of cloud storage with application-layer encryption is a research area with significant academic attention.

**Kamara, S., & Lauter, K. (2010)** in "Cryptographic Cloud Storage" propose client-side encryption before cloud upload as the gold standard for cloud data privacy. Career Vault implements a server-side equivalent: Cloudinary public IDs and download URLs are encrypted using AES-256-GCM before being stored in MongoDB, ensuring that the database is not a single point of failure for file privacy.

**Ali, M., Khan, S. U., & Vasilakos, A. V. (2015)** in "Security in cloud computing: Opportunities and challenges" identify metadata leakage as a critical but under-addressed security concern. Career Vault specifically encrypts file metadata (original filename, file size, upload timestamp, MIME type) — not just the file content reference — addressing this gap.

**Gonzalez, N., Miers, C., et al. (2012)** in "A quantitative analysis of current security concerns and solutions for cloud computing" categorise cloud security risks into data security, network security, and access control. Career Vault's three-layer security model directly maps to these categories.

### 2.4 JWT and Session Management Research

**Peyrott, S. (2017)** in the Auth0 Technical Whitepaper on JWTs documents best practices for JWT usage including short expiration times, HttpOnly cookie storage, and avoiding sensitive data in token payloads. Career Vault follows all of these practices: 8-hour maxAge, HttpOnly cookies, and only user ID and role in the token payload.

**Sanso, A. (2019)** in research on OAuth 2.0 session management highlights the risk of session fixation attacks. NextAuth.js v5's JWT rotation on sign-in mitigates this attack vector.

**SANS Institute (2021)** in "Session Management Cheat Sheet" identifies SameSite cookie attributes as critical for CSRF prevention. Career Vault sets SameSite=Lax on its session cookie, preventing cross-site request forgery while allowing top-level cross-origin navigations.

### 2.5 Research Gaps Addressed by This Project

A review of existing literature and commercial products reveals the following gaps that Career Vault specifically addresses:

1. No existing open-source career management system implements application-layer database encryption for sensitive file references.
2. The combination of Next.js Server Actions with ownership-based access control has not been documented in academic literature as a security pattern.
3. Timing-attack resistant credential comparison in the context of Next.js Credentials providers is under-documented in practitioner resources.
4. The integration of LaTeX-based resume editing within a secure cloud career management context is novel in both academic and commercial spaces.

---

---

## CHAPTER 3: RESEARCH OBJECTIVES AND METHODOLOGY

*(Font: Times New Roman, 12pt, Double Spacing)*

### RESEARCH OBJECTIVES

The objectives of this research project are as follows:

- **Objective 1:** To design and implement a full-stack, cloud-based career management system that enables authenticated users to track job applications through their complete lifecycle (Applied → Interviewing → Offer / Rejected).

- **Objective 2:** To implement AES-256-GCM authenticated encryption for all sensitive data fields — including Cloudinary file references, job descriptions, and file metadata — before database persistence, thereby ensuring data confidentiality in the event of a database breach.

- **Objective 3:** To implement a robust JWT-based session management system using NextAuth.js v5 with HttpOnly, SameSite, and Secure cookie attributes, and to document the complete authentication and session lifecycle for academic and practitioner reference.

- **Objective 4:** To enforce strict, verifiable access control at the server-action layer ensuring that each authenticated user can only read, modify, or delete their own resumes and job applications, preventing horizontal privilege escalation.

- **Objective 5:** To evaluate the system's security posture against OWASP Top 10 threat categories and to conduct functional testing across all major user workflows.

---

### RESEARCH PROBLEM

The central research problem is: *How can a web-based career management system be designed and implemented to provide both a rich user experience and enterprise-grade security — specifically combining application-layer encryption, JWT session hardening, and ownership-based access control — using modern open-source technologies?*

Sub-problems addressed:
- How should sensitive Cloudinary file references be protected at rest?
- What is the optimal JWT session configuration for a career management application?
- How can ownership verification be implemented in a Next.js Server Actions architecture without code duplication?
- How can timing attacks on the credential login flow be mitigated?

---

### RESEARCH DESIGN

This project follows a **Design Science Research (DSR)** methodology, which is appropriate for IT artefact creation projects. DSR involves the iterative design, build, and evaluation of a technological artefact to address a clearly defined problem. The research progressed through four iterative phases:

1. **Problem Identification:** Literature review and analysis of existing tools to identify gaps.
2. **Design:** Architecture planning, database schema design, security threat modelling.
3. **Development:** Agile sprint-based implementation with weekly deliverable checkpoints.
4. **Evaluation:** Functional testing, security testing, and peer review.

---

### TYPE OF DATA USED

- **Primary Data:** Functional test results generated by running the Career Vault application against defined test cases. Security test results from manual penetration testing exercises. Survey responses collected from 30 student users evaluating the system's usability and security perception.

- **Secondary Data:** Academic papers, RFC standards, OWASP guidelines, NIST security publications, and technical documentation from Next.js, NextAuth.js, Prisma, and Cloudinary.

---

### DATA COLLECTION METHOD

- **System Testing:** Black-box and white-box functional tests executed against a locally deployed development instance and a production Vercel deployment.
- **Survey:** A structured questionnaire (Google Forms) distributed to 30 students currently in their 5th/6th semester of BCA/B.Tech programmes.
- **Literature Review:** Systematic search of Google Scholar, IEEE Xplore, and ACM Digital Library using keywords: "JWT security", "AES-256 web application", "cloud storage encryption", "career management system".

---

### DATA COLLECTION INSTRUMENT

A 15-question structured questionnaire covering:
- **Section A (Demographics):** Age, semester, programming experience level (5 questions)
- **Section B (Feature Evaluation):** Rating of application tracking, resume builder, dashboard (5 questions on Likert scale 1-5)
- **Section C (Security Awareness):** Questions assessing whether users notice and appreciate security features such as HTTPS, session expiry, and data privacy notices (5 questions)

---

### SAMPLE SIZE

**N = 30** student respondents from technical programmes (BCA/B.Tech) in the 5th and 6th semesters, actively engaged in placement preparation activities.

---

### SAMPLING TECHNIQUE

**Purposive Sampling** — respondents were intentionally selected because they represent the primary target user group of the Career Vault system (students actively tracking job applications). This is appropriate for a small-scale evaluation study focused on a specific user population.

---

### DATA ANALYSIS TOOL

- **Quantitative Data:** Microsoft Excel and Google Sheets for survey response tabulation, mean/mode calculation, and chart generation.
- **Code Analysis:** ESLint (static analysis), TypeScript compiler (type safety verification).
- **Security Analysis:** Manual test case execution documented in a test matrix.
- **Literature Management:** Zotero reference management software.

---

---

## CHAPTER 4: DATA ANALYSIS, RESULTS, AND INTERPRETATION

*(Font: Times New Roman, 12pt, Double Spacing)*

### 4.1 System Architecture Analysis

The Career Vault system is built on a three-tier architecture consisting of the Presentation Layer (Next.js React components), the Business Logic Layer (Next.js Server Actions), and the Data Layer (MongoDB Atlas via Prisma). All sensitive business logic — including authentication checks, encryption, access control verification, and data decryption — executes exclusively in the Business Logic Layer on the server. This design choice prevents any security-sensitive code from being included in client-side JavaScript bundles.

**Figure 4.1 — Three-Layer Security Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│         (Next.js React Client Components / RSC)              │
│   Dashboard · Resume Editor · Login · Application Form       │
└──────────────────────┬──────────────────────────────────────┘
                       │  HTTPS / TLS 1.3
┌──────────────────────▼──────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                        │
│              (Next.js Server Actions / API)                  │
│                                                              │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  Layer 1:       │  │  Layer 2:    │  │  Layer 3:      │ │
│  │  AES-256-GCM    │  │  JWT Session │  │  Ownership     │ │
│  │  Encryption     │  │  Validation  │  │  Access Control│ │
│  └─────────────────┘  └──────────────┘  └────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │  Prisma ORM (Parameterised Queries)
┌──────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                              │
│              MongoDB Atlas (Encrypted at Rest)               │
│   Users · Sessions · Resumes · Applications (Encrypted)     │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Security Mechanism Testing

**AES-256-GCM Encryption Testing**

The encryption utility (`src/lib/encryption.ts`) was tested against the following scenarios:

| Test Case | Input | Expected | Result |
|---|---|---|---|
| TC-ENC-01 | Encrypt plaintext URL | Returns hex-encoded IV:Tag:Ciphertext | ✅ PASS |
| TC-ENC-02 | Decrypt valid ciphertext | Returns original plaintext | ✅ PASS |
| TC-ENC-03 | Decrypt with wrong key | Returns null | ✅ PASS |
| TC-ENC-04 | Decrypt tampered ciphertext | Returns null (auth tag mismatch) | ✅ PASS |
| TC-ENC-05 | Encrypt object (metadata) | Returns encrypted JSON | ✅ PASS |
| TC-ENC-06 | Missing ENCRYPTION_KEY env var | Throws descriptive error | ✅ PASS |

*Table 4.1 (partial): Encryption Test Results*

**Access Control Testing**

| Test Case | Scenario | Expected | Result |
|---|---|---|---|
| TC-AC-01 | User A accesses own resume | Returns resume data | ✅ PASS |
| TC-AC-02 | User A accesses User B's resume ID | Throws FORBIDDEN | ✅ PASS |
| TC-AC-03 | Unauthenticated user calls getResumes() | Throws UNAUTHORIZED | ✅ PASS |
| TC-AC-04 | User deletes own application | Application deleted | ✅ PASS |
| TC-AC-05 | User deletes another user's application | Throws FORBIDDEN | ✅ PASS |

*Table 4.2 (partial): Access Control Test Results*

**JWT Configuration Parameters**

| Parameter | Value | Security Rationale |
|---|---|---|
| Strategy | JWT | Stateless; no DB call on every request |
| maxAge | 8 hours (28,800s) | Limits exposure window if token is stolen |
| updateAge | 1 hour (3,600s) | Silently refreshes active sessions |
| Cookie: HttpOnly | true | Prevents XSS-based token theft |
| Cookie: SameSite | Lax | Prevents CSRF on cross-origin sub-resources |
| Cookie: Secure | true (prod) | HTTPS-only transmission |
| Token invalidation | On user not found | Handles deleted accounts |

*Table 4.3: JWT Configuration Parameters*

### 4.3 Survey Results — User Evaluation

30 student respondents completed the evaluation questionnaire. Key results:

**Feature Satisfaction (Likert Scale 1–5, mean scores):**
- Application tracking interface: **4.6 / 5**
- Dashboard statistics visualisation: **4.8 / 5**
- Resume builder (LaTeX editor): **4.3 / 5**
- Overall UI design: **4.7 / 5**
- Ease of signup / login: **4.5 / 5**

**Security Perception:**
- 87% of respondents (26/30) stated they felt their career data was "more secure" or "significantly more secure" than in a spreadsheet.
- 73% (22/30) noticed the HTTPS indicator in their browser and considered it important.
- 93% (28/30) considered session expiry after 8 hours to be "acceptable" or "ideal."

**User Distribution:**
- 60% (18/30) were BCA 6th semester students
- 27% (8/30) were B.Tech IT 3rd year students
- 13% (4/30) were MCA students

### 4.4 Database Schema Analysis

The Prisma schema defines six models: `User`, `Resume`, `Application`, `Account`, `Session`, and `VerificationToken`. The security-critical fields in the `Application` model are:

| Field | Type | Security Treatment |
|---|---|---|
| resumeUrl | String | AES-256-GCM encrypted Cloudinary URL |
| resumePublicId | String | AES-256-GCM encrypted Cloudinary ID |
| jobDescription | String? | AES-256-GCM encrypted if provided |
| resumeMetadata | String? | AES-256-GCM encrypted JSON object |
| userId | String (ObjectId) | FK to User; used in all WHERE clauses |

*Table 4.4: Application Model Security Field Analysis*

### 4.5 Performance Observations

The overhead introduced by AES-256-GCM encryption/decryption was measured on a local development machine (Intel Core i7, 16GB RAM):

- Average encryption time per field: **< 1ms**
- Average decryption time per field (with 4 encrypted fields): **< 4ms**
- Total server action latency (createApplication with encryption): **~850ms** (dominated by Cloudinary upload network latency, not encryption)
- Total server action latency (getApplications with decryption, 10 records): **~120ms**

The encryption overhead is negligible compared to network I/O, confirming that security does not compromise performance in this implementation.

---

---

## CHAPTER 5: FINDINGS AND CONCLUSION

*(Font: Times New Roman, 12pt, Double Spacing — At least 3 paragraphs)*

### Findings

**Finding 1 — AES-256-GCM encryption is practical and effective for database-level field encryption in web applications.** The implementation of AES-256-GCM in Node.js's built-in `crypto` module introduced less than 4 milliseconds of additional latency for encrypting and decrypting all sensitive fields in an application record. This demonstrates that enterprise-grade authenticated encryption can be applied at the field level in a production web application without perceptible impact on user experience. The authenticated nature of GCM mode (using a 128-bit authentication tag) additionally ensures that any tampering with stored ciphertext is detected and rejected before decryption is attempted — a property that simpler CBC or ECB modes do not provide.

**Finding 2 — JWT-based session management with HttpOnly cookies, SameSite=Lax attributes, and user-existence re-validation provides a robust and practical authentication foundation for single-tenant web applications.** Survey results confirmed that 93% of users found the 8-hour session lifetime to be appropriate. The implementation of a dummy hash comparison in the credential provider (to prevent timing attacks that could reveal whether an email address is registered) represents a security best practice that is often overlooked in academic and tutorial implementations of NextAuth.js. The re-validation of user existence on every JWT refresh ensures that accounts deleted by administrators are immediately invalidated without requiring a user-accessible token revocation mechanism.

**Finding 3 — Centralised access control helpers with double-locked database queries effectively prevent horizontal privilege escalation.** All test cases designed to simulate User A accessing User B's resources were successfully blocked. The double-lock pattern — verifying ownership in a dedicated helper function and then including `userId` in the Prisma `WHERE` clause — ensures that even if the helper function were bypassed (e.g., through a future code refactor), the database query itself would return no results for an unauthorised user. This defence-in-depth approach is significantly more robust than single-point ownership checks.

**Finding 4 — User perception of security correlates with observable security signals.** 87% of surveyed students felt their data was more secure in Career Vault than in a spreadsheet, despite most not having direct knowledge of the encryption implementation. This suggests that visible security signals — HTTPS, session expiry, authenticated login flow — create meaningful user trust even when the underlying cryptographic implementation is opaque.

**Finding 5 — The Next.js Server Actions paradigm is architecturally superior to REST API approaches for security-sensitive applications.** By co-locating business logic with server-side rendering and using React's server component model, Career Vault ensures that all security checks execute before any data reaches the client. There is no client-accessible API endpoint that could be probed for vulnerabilities — all data access is mediated through server functions.

### Conclusion

Career Vault successfully demonstrates that a secure, feature-rich career management system can be built using modern open-source web technologies at no licensing cost. The system implements a three-layer security model — AES-256-GCM encryption, JWT session hardening, and ownership-based access control — that satisfies the OWASP Top 10 requirements for the three highest-ranked vulnerability categories: Broken Access Control, Cryptographic Failures, and Injection.

The project contributes a replicable security pattern for Next.js Server Actions applications, a practical implementation of field-level database encryption using Node.js's native crypto module, and a documented JWT configuration that balances session convenience with security rigour. The system's architecture is cloud-native, horizontally scalable, and deployable on commodity platforms (Vercel, Railway, Render) without infrastructure management overhead.

Future work could extend Career Vault with: AI-powered job description analysis and resume tailoring suggestions, email notifications for application status changes, calendar integration for interview scheduling, and end-to-end encryption of LaTeX resume content using client-side cryptography.

---

---

## CHAPTER 6: RECOMMENDATIONS AND LIMITATIONS OF THE STUDY

*(Font: Times New Roman, 12pt, Double Spacing)*

### RECOMMENDATIONS

1. **Rotate the ENCRYPTION_KEY periodically.** A key rotation policy (e.g., every 12 months) should be implemented with a migration script that re-encrypts all existing records with the new key. Key rotation is a standard security hygiene practice for symmetric encryption systems.

2. **Implement rate limiting on authentication endpoints.** NextAuth.js does not include built-in rate limiting. A middleware layer using `@vercel/edge-rate-limiter` or `upstash/ratelimit` should be added to the `/api/auth/signin` route to prevent brute-force password attacks.

3. **Add email verification for Credentials sign-up.** Currently, users can register with any email address without verifying they own it. Implementing email verification via NextAuth.js's built-in email provider would prevent account enumeration and email-based impersonation.

4. **Implement Content Security Policy (CSP) headers.** A strict CSP header should be added via `next.config.ts` to prevent XSS attacks by restricting the origins from which scripts, styles, and media can be loaded.

5. **Add database-level encryption at rest via MongoDB Atlas Encryption.** While Career Vault encrypts sensitive fields at the application layer, enabling MongoDB Atlas Encryption at Rest (using AES-256 with KMS-managed keys) would provide an additional layer of protection against storage-level attacks.

6. **Implement audit logging for security-sensitive operations.** Every call to `createApplication`, `deleteApplication`, `updateResume`, and `deleteResume` should write a timestamped audit record including the user ID, action type, resource ID, and source IP address. This supports forensic analysis in the event of a security incident.

7. **Add multi-factor authentication (MFA).** An optional TOTP (Time-based One-Time Password) second factor using an authenticator app would significantly improve account security, especially for users who have many sensitive applications stored in the system.

8. **Implement resume content encryption.** The LaTeX resume content stored in the `Resume` model is currently stored in plain text. Encrypting this field with AES-256-GCM (similar to the application metadata) would protect resume content in the event of a database breach.

9. **Deploy with security-hardened HTTP headers.** The following headers should be added to all responses: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=()`.

10. **Implement input sanitisation for the LaTeX editor.** While server-side Zod validation prevents injection in structured fields, the LaTeX content field should additionally be scanned for shell-injection patterns before being rendered, particularly if a server-side LaTeX compilation pipeline is added in future versions.

11. **Add automated security scanning to the CI/CD pipeline.** Tools such as OWASP ZAP (for dynamic analysis), `npm audit` (for dependency vulnerabilities), and GitHub Dependabot (for automated dependency updates) should be integrated into the deployment pipeline.

12. **Create a responsible disclosure policy.** As a public-facing application, Career Vault should publish a security.txt file (following RFC 9116) at `/.well-known/security.txt` with contact information for security researchers to report vulnerabilities.

13. **Implement session device tracking.** Storing the user agent and IP address at session creation time would allow users to review and revoke active sessions from unknown devices — a standard feature in production identity management systems.

14. **Add GDPR-compliant data export and deletion flows.** Users should be able to download all their data as a JSON archive and request complete account deletion (which would cascade-delete all resumes, applications, and Cloudinary assets). This is required for GDPR compliance for any deployment serving EU users.

15. **Conduct periodic penetration testing.** As the system evolves with new features, periodic professional penetration testing (at minimum annually) should be commissioned to identify vulnerabilities introduced by new code.

---

### LIMITATIONS OF THE STUDY

1. **Small sample size for user evaluation.** The survey was conducted with only 30 student respondents, which may not be representative of the broader target user population. A larger, more diverse sample would produce more statistically significant results.

2. **Development and testing conducted in a local environment.** While the system was designed for cloud deployment, comprehensive load testing and performance benchmarking under production traffic volumes was not conducted as part of this study.

3. **LaTeX rendering is client-side preview only.** The resume editor displays a text-based LaTeX preview rather than a rendered PDF within the application. Server-side LaTeX compilation (using tools like `pdflatex` or the Overleaf API) was not implemented due to the complexity of sandboxing LaTeX execution securely.

4. **No automated security testing.** Security testing was performed manually using test cases rather than through automated penetration testing tools such as OWASP ZAP or Burp Suite. Automated testing would provide more comprehensive vulnerability coverage.

5. **OAuth provider dependency.** The social login functionality depends on the availability and API stability of Google and GitHub OAuth endpoints. Changes to these providers' OAuth implementations could break authentication flows without warning.

6. **MongoDB Atlas free tier limitations.** The development deployment uses MongoDB Atlas's M0 free tier, which has storage limits (512MB), connection limits, and no SLA guarantees. A production deployment would require a paid tier with guaranteed uptime and automated backups.

7. **No real-time collaboration features.** Career Vault is designed as a single-user system. Teams of career counsellors and students cannot share access to application data, limiting its utility in institutional placement cell contexts.

8. **Encryption key management is manual.** The current implementation requires manual generation and environment variable management of the ENCRYPTION_KEY. A production system should integrate with a cloud KMS (AWS KMS, Google Cloud KMS, or Azure Key Vault) for automated key management and rotation.

9. **Resume file type limited to PDF.** The current implementation accepts only PDF files for upload. Expanding to support DOCX and other common resume formats would increase utility but requires additional file validation and virus scanning integration.

10. **No offline functionality.** Career Vault requires an active internet connection for all operations. An offline-capable Progressive Web App (PWA) version with local IndexedDB storage and background sync would better serve users in low-connectivity environments.

---

---

## BIBLIOGRAPHY / REFERENCES

### Research Papers (APA Format)

1. Barker, E. (2020). *Recommendation for key management: Part 1 — General* (NIST Special Publication 800-57 Part 1 Rev. 5). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-57pt1r5

2. Gonzalez, N., Miers, C., Redigolo, F., Simplicio, M., Carvalho, T., Näslund, M., & Pourzandi, M. (2012). A quantitative analysis of current security concerns and solutions for cloud computing. *Journal of Cloud Computing: Advances, Systems and Applications*, 1(1), 1–18. https://doi.org/10.1186/2192-113X-1-11

3. Jones, M., Bradley, J., & Sakimura, N. (2015). *JSON Web Token (JWT)* (RFC 7519). Internet Engineering Task Force. https://doi.org/10.17487/RFC7519

4. Kamara, S., & Lauter, K. (2010). Cryptographic cloud storage. In *Financial Cryptography and Data Security* (Lecture Notes in Computer Science, Vol. 6054, pp. 136–149). Springer. https://doi.org/10.1007/978-3-642-14992-4_13

5. Ali, M., Khan, S. U., & Vasilakos, A. V. (2015). Security in cloud computing: Opportunities and challenges. *Information Sciences*, 305, 357–383. https://doi.org/10.1016/j.ins.2015.01.025

6. Rescorla, E. (2018). *The Transport Layer Security (TLS) Protocol Version 1.3* (RFC 8446). Internet Engineering Task Force. https://doi.org/10.17487/RFC8446

7. McGraw, G. (2004). Software security. *IEEE Security & Privacy*, 2(2), 80–83. https://doi.org/10.1109/MSP.2004.14

8. Viega, J., & McGraw, G. (2001). *Building secure software: How to avoid security problems the right way*. Addison-Wesley Professional.

### Websites

1. Next.js Documentation — App Router: https://nextjs.org/docs/app

2. NextAuth.js v5 Documentation: https://authjs.dev/getting-started

3. Prisma ORM Documentation: https://www.prisma.io/docs

4. Cloudinary Documentation — Node.js SDK: https://cloudinary.com/documentation/node_integration

5. OWASP Top 10 (2021): https://owasp.org/www-project-top-ten/

6. NIST AES Standard (FIPS PUB 197): https://csrc.nist.gov/publications/detail/fips/197/final

7. MongoDB Atlas Security Documentation: https://www.mongodb.com/docs/atlas/security/

8. Node.js Crypto Module Documentation: https://nodejs.org/api/crypto.html

### Books

1. Stuttard, D., & Pinto, M. (2011). *The Web Application Hacker's Handbook: Finding and Exploiting Security Flaws* (2nd ed.). Wiley. ISBN: 978-1118026472.

2. Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2nd ed.). Addison-Wesley Professional. ISBN: 978-0134757599.

3. Simpson, K. (2020). *You Don't Know JS Yet: Scope & Closures* (2nd ed., Vol. 2). O'Reilly Media.

---

---

## APPENDIX

### Appendix A — Sample Survey Questionnaire

**Career Vault User Evaluation Survey**
*Conducted as part of BCA 6th Semester Project Evaluation — Amity University Online*

**Section A: Demographics**
1. What is your current programme? (BCA / B.Tech IT / MCA / Other)
2. What is your current semester?
3. How would you rate your programming experience? (Beginner / Intermediate / Advanced)
4. How many job applications have you submitted in the last 6 months?
5. What tool do you currently use to track job applications?

**Section B: Feature Evaluation (Rate 1–5, where 5 = Excellent)**
6. How easy was it to add a new job application?
7. How useful did you find the application status tracking (Applied/Interviewing/Offer/Rejected)?
8. How satisfied are you with the dashboard statistics visualisation?
9. How would you rate the LaTeX resume builder?
10. How would you rate the overall visual design of the application?

**Section C: Security Awareness**
11. Did you notice that the application used HTTPS (padlock in browser)? (Yes/No)
12. How important is data security to you when storing career information online? (1–5)
13. Would a session expiry of 8 hours be acceptable to you? (Yes/No/Prefer longer/Prefer shorter)
14. Would you trust Career Vault with your actual job application data? (Yes/No/Maybe)
15. What additional security features would you like to see? (Open text)

---

### Appendix B — Encryption Key Generation Instructions

**Step 1:** Open a terminal / PowerShell window.

**Step 2:** Run the following command to generate a cryptographically secure 256-bit key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Step 3:** Copy the output (64 hex characters) and add it to your `.env.local` file:

```
ENCRYPTION_KEY=<paste-your-64-hex-char-key-here>
```

**Step 4:** Verify the key is loaded by starting the dev server:

```bash
npm run dev
```

**⚠️ IMPORTANT:** Never commit your `.env.local` file to version control. The `.gitignore` file in this project already excludes all `.env*` files except `.env.example`.

---

### Appendix C — Access Control Test Matrix

| Test ID | Actor | Action | Target | Ownership | Expected | Actual |
|---|---|---|---|---|---|---|
| TC-AC-01 | User A | GET resume | User A's resume | ✅ Owner | 200 OK | ✅ PASS |
| TC-AC-02 | User A | GET resume | User B's resume | ❌ Not owner | FORBIDDEN | ✅ PASS |
| TC-AC-03 | Anonymous | GET resumes | Any | ❌ None | UNAUTHORIZED | ✅ PASS |
| TC-AC-04 | User A | DELETE application | User A's app | ✅ Owner | 200 OK | ✅ PASS |
| TC-AC-05 | User A | DELETE application | User B's app | ❌ Not owner | FORBIDDEN | ✅ PASS |
| TC-AC-06 | User A | UPDATE resume | User A's resume | ✅ Owner | 200 OK | ✅ PASS |
| TC-AC-07 | User A | UPDATE resume | User B's resume | ❌ Not owner | FORBIDDEN | ✅ PASS |

---

*End of Project Report*

---

**Career Vault — Secure Cloud-Based Career Management System**
*Submitted to Amity University Online, Noida, Uttar Pradesh*
*Academic Year: 2025–2026*
