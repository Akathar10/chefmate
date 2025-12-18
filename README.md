# 👨‍🍳 ChefMate - Smart Indian Recipe Finder

## 💡 The Problem
Most recipe apps rely on Western databases. If you search for **"Paneer"** or **"Dal"**, they often return zero results. Furthermore, sharing a shopping list with family usually involves manually typing ingredients into WhatsApp.

## 🚀 The Solution
**ChefMate** is a smart recipe web app designed for the Indian context.
1.  **Smart Search Algorithm:** It prioritizes Indian cuisine. Searching "Chicken" shows *Chicken Biryani* first, not *Chicken Nuggets*.
2.  **Hybrid Database:** Combines a global API with a custom local database for authentic Indian dishes (Paneer, Chole, Dosa).
3.  **One-Click WhatsApp Share:** Instantly formats the ingredient list and video link into a WhatsApp message to send to mom or roommates.
4.  **Fail-Safe Video:** Guarantees a working video tutorial link for every single recipe (no broken links).

## ✨ Key Features
* **🛒 WhatsApp Integration:** Generates a shopping list + video link instantly.
* **🧠 "Indian-First" Search Logic:** Custom backend logic to rank Indian recipes higher.
* **📱 Fully Responsive:** Works beautifully on Laptop and Mobile (using Tailwind CSS).
* **🎥 Smart Video Link:** Automatically finds a YouTube tutorial if one is missing from the database.

## 🛠️ Tech Stack
* **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS
* **Backend:** Node.js, Express.js
* **API:** TheMealDB + Custom Local Data

## ⚙️ How to Run Locally

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/chefmate.git](https://github.com/YOUR_USERNAME/chefmate.git)
    cd chefmate
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server (The Engine)**
    ```bash
    cd server
    node server.js
    ```
    *You should see: `Server running on port 3000`*

4.  **Run the App (The Frontend)**
    * Open `public/index.html` with **Live Server** in VS Code.

