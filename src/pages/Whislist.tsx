import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {red, white} from '../utils/color';

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'tuxedo',
    price: 200,
    image: require('../Images/Image/facebook.png'),
  },
  {
    id: '2',
    name: 'american jeans',
    price: 150,
    image: require('../Images/Image/istockphoto-957655180-612x612.jpg'),
  },
  {
    id: '3',
    name: 'indonesian batik',
    price: 170,
    image: require('../Images/Image/HalalMart.png'),
  },
  // Add more products...
];

const Whislist: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [byPrice, setByPrice] = useState<boolean>(false);
  const [byName, setByName] = useState<boolean>(false);

  const addToCart = (productId: string) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      item => item.productId === productId,
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      updatedCart[existingProductIndex].quantity++;
    } else {
      // If the product is not in the cart, add it with quantity 1
      updatedCart.push({productId, quantity: 1});
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map(item =>
      item.productId === productId
        ? {...item, quantity: item.quantity + 1}
        : item,
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productId: string) => {
    const updatedCart = cart.map(item =>
      item.productId === productId && item.quantity > 1
        ? {...item, quantity: item.quantity - 1}
        : item,
    );
    setCart(updatedCart);
  };

  const sortProducts = () => {
    let sortedProducts = [...products];
    if (byPrice) {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (byName) {
      sortedProducts = sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }
    return sortedProducts;
  };

  const renderProduct = ({item}: {item: Product}) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => addToCart(item.id)}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          Quantity:{' '}
          {cart.find(cartItem => cartItem.productId === item.id)?.quantity || 0}
        </Text>
        <TouchableOpacity
          onPress={() => incrementQuantity(item.id)}
          style={styles.quantityButton}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => decrementQuantity(item.id)}
          style={styles.quantityButton}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach(cartItem => {
      const product = products.find(
        product => product.id === cartItem.productId,
      );
      if (product) {
        total += product.price * cartItem.quantity;
      }
    });
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageWhislist}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/93/93634.png',
            }}
            style={{width: 30, height: 30, left: 15}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Poppins-SemiBold',
            color: white,
            paddingLeft: '26%',
            // bottom: 15,
          }}>
          Whislist
        </Text>
      </View>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* Display products */}
      <FlatList
        data={sortProducts()}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />

      <View style={styles.cartContainer}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cart.map(cartItem => (
            <View key={cartItem.productId}>
              <Text style={styles.cartItemName}>
                {
                  products.find(product => product.id === cartItem.productId)
                    ?.name
                }
              </Text>
              <TouchableOpacity
                onPress={() => removeFromCart(cartItem.productId)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        {cart.length > 0 && (
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>
              Total Price: ${calculateTotalPrice()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageWhislist: {
    backgroundColor: 'yellow',
    width: '150%',
    height: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: red,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  emptyCartText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888888',
  },
  totalPriceContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButtonText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 5,
  },
  quantityText: {
    marginLeft: 5,
  },
});

export default Whislist;
