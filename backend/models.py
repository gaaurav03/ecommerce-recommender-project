import pandas as pd
import json
from config import Config

class ProductDataManager:
    def __init__(self):
        self.df = None
        self.load_data()
    
    def load_data(self):
        try:
            self.df = pd.read_excel(Config.DATA_PATH)
            self.df['specs'] = self.df['specs'].apply(self._parse_specs)
            print(f"Loaded {len(self.df)} products successfully")
        except Exception as e:
            print(f"Error loading data: {e}")
            raise
    
    def _parse_specs(self, specs_str):
        try:
            if pd.isna(specs_str):
                return {}
            return json.loads(specs_str)
        except:
            return {}
    
    def get_all_products(self):
        return self.df.to_dict('records')
    
    def get_categories(self):
        return sorted(self.df['category'].unique().tolist())
    
    def get_brands_by_category(self, category=None):
        if category:
            filtered_df = self.df[self.df['category'] == category]
            return sorted(filtered_df['brand'].unique().tolist())
        return sorted(self.df['brand'].unique().tolist())
    
    def get_price_range(self, category=None):
        if category:
            filtered_df = self.df[self.df['category'] == category]
        else:
            filtered_df = self.df
        
        return {
            'min': float(filtered_df['price'].min()),
            'max': float(filtered_df['price'].max())
        }
    
    def filter_products(self, filters):
        filtered_df = self.df.copy()
        
        if filters.get('category'):
            filtered_df = filtered_df[filtered_df['category'] == filters['category']]
        
        if filters.get('brands'):
            filtered_df = filtered_df[filtered_df['brand'].isin(filters['brands'])]
        
        if filters.get('min_price') is not None:
            filtered_df = filtered_df[filtered_df['price'] >= filters['min_price']]
        
        if filters.get('max_price') is not None:
            filtered_df = filtered_df[filtered_df['price'] <= filters['max_price']]
        
        if filters.get('min_rating') is not None:
            filtered_df = filtered_df[filtered_df['rating'] >= filters['min_rating']]
        
        return filtered_df
    
    def get_product_by_id(self, product_id):
        product = self.df[self.df['product_id'] == int(product_id)]
        if not product.empty:
            return product.iloc[0].to_dict()
        return None