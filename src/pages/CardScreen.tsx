import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, grey, white} from '../utils/color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../Router/Index';
import axios from 'axios';
interface Product {
  id: number;
  image: string;
  title: string;
}

const CardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.pageWhislist}>
        <TouchableOpacity onPress={() => navigation.replace('ProfileScreen')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/93/93634.png',
            }}
            style={{width: 30, height: 30, left: 15, top: 15}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Poppins-SemiBold',
            color: white,
            paddingLeft: '43%',
            bottom: 15,
          }}>
          Card
        </Text>
      </View>
      <ScrollView>
        <View style={styles.categoryItemProduck}>
          <Text style={{fontSize: 25, color: grey, margin: 20, right: 25}}>
            Produck Yang Disukai
          </Text>
          {products.map(product => (
            <TouchableOpacity key={product.id}>
              <Image
                source={{uri: product.image}}
                style={{width: 45, height: 35, right: 10}}
              />
              <Text style={styles.categoryTextProduck}>{product.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  pageWhislist: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '7%',
  },
  categoryItemProduck: {
    backgroundColor: white,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    height: '100%',
    margin: 20,
  },
  categoryTextProduck: {
    width: '85%',
    fontSize: 16,
    color: black,
    bottom: 36,
    left: 55,
  },
});
