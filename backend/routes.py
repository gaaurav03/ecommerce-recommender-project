from flask import Blueprint, jsonify, request
from models import ProductDataManager
from recommender import ProductRecommender

api = Blueprint('api', __name__)

data_manager = ProductDataManager()
recommender = ProductRecommender(data_manager)

@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'API is running'}), 200

@api.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = data_manager.get_categories()
        return jsonify({'categories': categories}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/brands', methods=['GET'])
def get_brands():
    try:
        category = request.args.get('category')
        brands = data_manager.get_brands_by_category(category)
        return jsonify({'brands': brands}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/price-range', methods=['GET'])
def get_price_range():
    try:
        category = request.args.get('category')
        price_range = data_manager.get_price_range(category)
        return jsonify(price_range), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/products', methods=['GET'])
def get_all_products():
    try:
        products = data_manager.get_all_products()
        return jsonify({'products': products, 'total': len(products)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = data_manager.get_product_by_id(product_id)
        if product:
            return jsonify(product), 200
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/recommend', methods=['POST'])
def recommend():
    try:
        filters = request.json
        sort_by = filters.pop('sort_by', 'score')
        limit = filters.pop('limit', 20)
        
        recommendations = recommender.recommend_products(filters, sort_by, limit)
        
        return jsonify({
            'products': recommendations,
            'total': len(recommendations),
            'filters_applied': filters
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/products/<int:product_id>/similar', methods=['GET'])
def get_similar_products(product_id):
    try:
        limit = request.args.get('limit', default=5, type=int)
        similar = recommender.get_similar_products(product_id, limit)
        return jsonify({'similar_products': similar, 'total': len(similar)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500