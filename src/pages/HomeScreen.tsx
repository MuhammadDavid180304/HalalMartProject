import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, greenyoung, grey, red, white} from '../utils/color';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';

interface Product {
  id: number;
  image: string;
  title: string;
}

const HomeScreen = () => {
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

  const [images, setImages] = useState([
    require('../Images/Image/istockphoto-957655180-612x612.jpg'),
    require('../Images/Image/bennerShop.png'),
    require('../Images/Image/pexels-markus-winkler-12081286.jpg'),
    require('../Images/Image/pexels-nothing-ahead-7451957.jpg'),
    require('../Images/Image/pexels-shvets-production-7195232.jpg'),
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Cari produk" style={styles.input} />
        <Image
          style={{width: 20, height: 20, left: 20, bottom: 13}}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3031/3031293.png',
          }}
        />
        <TouchableOpacity>
          <Image
            style={{width: 30, height: 30, left: '90%', bottom: '135%'}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3144/3144456.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <SliderBox
        images={images}
        sliderBoxHeight={150}
        onCurrentImagePressed={(index: any) =>
          console.warn(`image ${index} pressed`)
        }
        dotColor="red"
        inactiveDotColor="black"
        paginationBoxVerticalPadding={10}
        autoplay
        circleLoop
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)',
          top: 25,
        }}
        ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 10}}
        imageLoadingColor="#e74c3c"
      />
      <View style={styles.Horizontalview}>
        <Text
          style={{
            fontSize: 25,
            color: grey,
            top: 15,
          }}>
          Kategori Produk
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryItem}>
            <TouchableOpacity>
              <Image
                source={require('../Images/Image/kebutuhanDapur.png')}
                style={styles.categoryProduck}
              />
              <Text style={styles.categoryText}>Kebutuhan Dapur</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryItem}>
            <TouchableOpacity>
              <Image
                source={require('../Images/Image/KebutuhanRumah.png')}
                style={styles.categoryProduck}
              />
              <Text style={styles.categoryText}>Kebutuhan Rumah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryItem}>
            <TouchableOpacity>
              <Image
                source={require('../Images/Image/Makanan.png')}
                style={styles.categoryProduck}
              />
              <Text style={styles.categoryText}>Makanan Ringan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryItem}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/5825/5825340.png',
                }}
                style={styles.categoryProduck}
              />
              <Text style={styles.categoryText}>Minuman Segar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.categoryItemProduck}>
          <Text style={{fontSize: 25, color: grey, margin: 15, right: 25}}>
            Produck Terlaris
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'yellow',
  },
  input: {
    width: '85%',
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 45,
    marginLeft: 9,
    top: 20,
    backgroundColor: white,
  },
  Horizontalview: {
    width: '90%',
    height: '20%',
    backgroundColor: greenyoung,
    marginTop: 25,
    paddingLeft: 20,
    left: 22,
    borderRadius: 10,
  },
  categoryItem: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: white,
    borderRadius: 20,
    height: '40%',
    top: 45,
  },
  categoryProduck: {
    width: 35,
    height: 35,
    bottom: 2,
    right: 60,
  },
  categoryText: {
    fontSize: 16,
    color: grey,
    bottom: 28,
    fontFamily: 'Poppins-SemiBold',
  },
  categoryItemProduck: {
    backgroundColor: white,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    height: '100%',
    margin: 20,
  },
  Verticalview: {
    width: '90%',
    height: '20%',
    backgroundColor: greenyoung,
    paddingLeft: 20,
    left: 22,
    borderRadius: 20,
  },
  categoryTextProduck: {
    width: '88%',
    fontSize: 16,
    color: black,
    bottom: 36,
    left: 55,
  },
});

export default HomeScreen;
