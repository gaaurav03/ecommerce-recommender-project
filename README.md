# 🛍️ E-Commerce Product Recommender

Tired of endlessly scrolling through electronics online? This product recommender app helps you find the perfect gadget by recommending products based on what *really* matters: user ratings, reviews, and your budget.



***

## What It Does

* **🧠 Smart Recommendations**: Our custom algorithm finds the best products for you based on a weighted score of ratings, review counts, and price.
* **🔎 Advanced Filtering**: Zero in on exactly what you want. Filter by category, select multiple brands, slide to your price range, and set a minimum rating.
* **📊 Sorting Options Galore**: Sort products by our "best match," highest rating, number of reviews, or price (low-to-high or high-to-low).
* **📱 Fully Responsive**: Looks and works great whether you're on a desktop, tablet, or phone.
* **⚡ Real-time Updates**: Filters and sorting apply instantly, no waiting around!

***
## Demo Video
[![Watch the video](https://img.youtube.com/vi/Q3hV2XMhzjk/maxresdefault.jpg)](https://www.youtube.com/watch?v=Q3hV2XMhzjk)

 
## Technology Used

Here's a look at the technologies that power this application.

### Backend
* Python 3.8+
* Flask 
* Pandas 
* NumPy

### Frontend
* React 18
* Axios
* CSS3 

***



## How The Code is Organized

```
ecommerce-recommender/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── config.py              # Configuration settings
│   ├── models.py              # Data management
│   ├── routes.py              # API endpoints
│   ├── recommender.py         # Recommendation algorithm
│   ├── requirements.txt       # Python dependencies
│   └── data/
│       └── electronics_products_dataset_sample.xlsx
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # React entry point
│   │   ├── components/
│   │   │   ├── FilterPanel.js      # Filter sidebar component
│   │   │   ├── ProductCard.js      # Individual product display
│   │   │   ├── ProductList.js      # Product grid layout
│   │   │   └── LoadingSpinner.js   # Loading indicator
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── FilterPanel.css
│   │   │   ├── ProductCard.css
│   │   │   └── ProductList.css
│   │   └── services/
│   │       └── api.js         # API service layer
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started 

Ready to run the project locally? Just follow these steps.

### What You'll Need
* Python (3.8 or newer)
* Node.js (14 or newer) with npm or yarn

### Setting Up the Backend
1.  Head into the backend folder:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    # Create the environment
    python -m venv venv

    # On Windows
    venv\Scripts\activate

    # On macOS/Linux
    source venv/bin/activate
    ```
3.  Install the necessary Python packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  Make sure your dataset (`electronics_products_dataset_sample.xlsx`) is inside the `backend/data/` folder.
5.  Fire it up!
    ```bash
    python app.py
    ```
    The backend should now be running at `http://localhost:5000`.

### Setting Up the Frontend
1.  Open a new terminal and switch to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install all the Node.js packages:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm start
    ```
    Your browser should automatically open to `http://localhost:3000`.

***

## How Recommendations Work 

Our secret sauce is a weighted scoring algorithm that balances three key factors to find the "best match" for you:

* **Rating Score (50%)**: Higher-rated products get a big boost.
* **Review Score (30%)**: Products with more reviews (a good sign of popularity) are favored.
* **Price Score (20%)**: We give a slight edge to more affordable items, assuming better value for money.

The final score is calculated with this formula:

```python
score = (rating_normalized * 0.5) + (reviews_normalized * 0.3) + (price_normalized * 0.2)

***
```
## Make It Your Own 

This project is easy to customize. Here’s how:

* **Adding New Categories**: Just add a new category to your dataset file. The backend and frontend will automatically pick it up!
* **Tweak the Algorithm**: Want to value reviews more than price? Head over to `backend/recommender.py` and adjust the weights in the `_calculate_score` method.
* **Change the Look**: All styling is handled in the CSS files under `frontend/src/styles/`. Go wild!

***


## What's Next?

I've got big plans for the future! Here are some features I would love to add:

* User accounts to save preferences and filters
* A product comparison tool
* Wishlist functionality
* A search bar to find products by name
* Price history charts for products
* Admin panel to manage the product data
