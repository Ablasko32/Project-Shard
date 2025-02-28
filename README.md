<div align="center" ><img src="./public/logo.svg" width="50px" /></div>

# **Welcome to Project Shard**

<p align="center">
   <img src="https://img.shields.io/badge/Next.js-15.1.6-green" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0.0-green" alt="React">
  <img src="https://img.shields.io/badge/Drizzle ORM-0.39.3-blue" alt="Drizzle ORM">

</p>

Project Shard is a pet project of mine. It is designed to be a simple and user-friendly **GUI interface** for users to interact with their favorite **LLMs localy**.
Currently , it supports both [**Ollama models**](https://ollama.com/search) and [**Open Router**](https://openrouter.ai/) .

> **NEW** - added support for Open Router! Some models are free! Requires API key!

The core idea is to provide an **all-in-one** solution that runs **privately** on your **localhost**.

The main focus is on being **FREE**, **OPEN SOURCE**, and **PRIVATE**.

## **Video Demo**

[![project shard demo](https://img.youtube.com/vi/9BE6c-0AB0E/0.jpg)](https://www.youtube.com/watch?v=9BE6c-0AB0E)

---

## **Features**

✅ **Multiple Profiles** – Create unique profiles for different household members.

✅ **Stream Chat Interface with Markdown Support** – Enjoy a modern, real-time chat experience like you would expect!

✅ **Document-Based RAG** – Upload documents to enhance retrieval-augmented generation (RAG) - feed your knowledge to the model.

✅ **Model Management & Customization** – Swap models,pull models, create you own by adjusting parameters like temperature or context size

✅ **Chat Storage** – Securely save conversations in a database and resume them anytime.

✅ **Prompt Library** – Store frequently used prompts for quick access.

✅ **Personalized Settings** – Define your name and default system prompts.

✅ **Voice support** – Tired of typing? Full voice support included!

✅ **Light/Dark themes** – Supports both light and dark theme to suit your style!

✅ **Responsive Design** – Use the app on all devices no matter the screen size!

---

## **Architecture**

**Project Shard** consists of several parts:

- **App** - A modern GUI interface built with Next.js.
- **Database** - PostgreSQL database with vector support to store all your data
- **Ollama API** - Ollama API to interact with local models

---

## **Tech stack**

| Component    | Technology                          |
| ------------ | ----------------------------------- |
| **App**      | Next.js + TypeScript                |
| **Database** | Drizzle ORM + PostgreSQL + PgVector |
| **Styling**  | Tailwind CSS                        |

---

## How to Use

To get started with development, follow these steps:

1. **Prerequisites**:

   - Ensure the **Ollama API** is installed.
   - Install **Docker** to set up the PostgreSQL database.
   - Dont forget to run **Drizzle** migrations via `npx drizzle-kit migrate` command too setup your DB tables

2. **Configuration**:

   - Create a `.env` file based on the provided `env.example` template and configure it with your settings.

3. **Setup and Run**:
   - Run `npm install` to install the required dependencies.
   - Start the application by running `npm run dev`.

## Run in Docker

*If you're running Ollama on the Docker host, restart it with ``OLLAMA_HOST=0.0.0.0`` to allow connections from Docker's network as well.*

1. Clone the repository: ``git clone https://github.com/Ablasko32/Project-Shard.git``

2. Navigate into the project directory: ``cd Project-Shard``

3. Set up the ``.env`` file. Use ``.env-docker-example`` as a reference. Then, start the containers: ``docker-compose up -d``


## **Licence**

This project is licensed under the [MIT License](./LICENSE).

---

## **Contributing**

If you’d like to contribute to the development of Project Shard, feel free to fork the repository and submit pull requests. We welcome suggestions and improvements!

To ensure a smooth collaboration process, please create a **separate branch** for your changes rather than merging directly into `master`. This helps us review and integrate contributions without disrupting the main branch.

---

## **Development Status**

🚧 **Work in Progress**
