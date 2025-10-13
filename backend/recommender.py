import numpy as np
import pandas as pd

class ProductRecommender:
    def __init__(self, data_manager):
        self.data_manager = data_manager
    
    def recommend_products(self, filters, sort_by='score', limit=20):
        filtered_df = self.data_manager.filter_products(filters)
        
        if filtered_df.empty:
            return []
        
        filtered_df = filtered_df.copy()
        filtered_df['recommendation_score'] = self._calculate_score(filtered_df)
        
        if sort_by == 'score':
            filtered_df = filtered_df.sort_values('recommendation_score', ascending=False)
        elif sort_by == 'price_asc':
            filtered_df = filtered_df.sort_values('price', ascending=True)
        elif sort_by == 'price_desc':
            filtered_df = filtered_df.sort_values('price', ascending=False)
        elif sort_by == 'rating':
            filtered_df = filtered_df.sort_values('rating', ascending=False)
        elif sort_by == 'reviews':
            filtered_df = filtered_df.sort_values('num_reviews', ascending=False)
        
        return filtered_df.head(limit).to_dict('records')
    
    def _calculate_score(self, df):
        rating_normalized = df['rating'] / 5.0
        
        max_reviews = df['num_reviews'].max()
        min_reviews = df['num_reviews'].min()
        
        if max_reviews > min_reviews:
            reviews_normalized = (df['num_reviews'] - min_reviews) / (max_reviews - min_reviews)
        else:
            reviews_normalized = 0.5
        
        max_price = df['price'].max()
        min_price = df['price'].min()
        
        if max_price > min_price:
            price_normalized = 1 - ((df['price'] - min_price) / (max_price - min_price))
        else:
            price_normalized = 0.5
        
        score = (rating_normalized * 0.5) + (reviews_normalized * 0.3) + (price_normalized * 0.2)
        
        return score
    
    def get_similar_products(self, product_id, limit=5):
        product = self.data_manager.get_product_by_id(product_id)
        
        if not product:
            return []
        
        df = self.data_manager.df
        same_category = df[
            (df['category'] == product['category']) & 
            (df['product_id'] != product_id)
        ].copy()
        
        if same_category.empty:
            return []
        
        price_diff = abs(same_category['price'] - product['price'])
        rating_diff = abs(same_category['rating'] - product['rating'])
        
        max_price_diff = price_diff.max() if price_diff.max() > 0 else 1
        max_rating_diff = rating_diff.max() if rating_diff.max() > 0 else 1
        
        price_similarity = 1 - (price_diff / max_price_diff)
        rating_similarity = 1 - (rating_diff / max_rating_diff)
        
        brand_similarity = (same_category['brand'] == product['brand']).astype(float)
        
        same_category['similarity_score'] = (
            price_similarity * 0.3 + 
            rating_similarity * 0.4 + 
            brand_similarity * 0.3
        )
        
        similar_products = same_category.nlargest(limit, 'similarity_score')
        
        return similar_products.to_dict('records')