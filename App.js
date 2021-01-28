import React, { useRef, useState, useCallback } from 'react';
import {
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';

const THUMB_IMG_SIZE = 80;
const THUMB_IMG_SPACING = 10;

const { width, height } = Dimensions.get('window');

const images = [
    {
        id: 1,
        src:
            'https://images.pexels.com/photos/4737039/pexels-photo-4737039.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: 2,
        src:
            'https://images.pexels.com/photos/2976370/pexels-photo-2976370.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
        id: 3,
        src:
            'https://images.pexels.com/photos/6551946/pexels-photo-6551946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: 4,
        src:
            'https://images.pexels.com/photos/5695556/pexels-photo-5695556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: 5,
        src:
            'https://images.pexels.com/photos/6576917/pexels-photo-6576917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: 6,
        src:
            'https://images.pexels.com/photos/4014919/pexels-photo-4014919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: 7,
        src:
            'https://images.pexels.com/photos/4315829/pexels-photo-4315829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
        id: 8,
        src:
            'https://images.pexels.com/photos/6214967/pexels-photo-6214967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
];

const App = () => {
    const bigFlatListRef = useRef(null);
    const smallFlatListRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const setActiveImageIndex = useCallback((index) => {
        setActiveIndex(index);

        bigFlatListRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
        });

        if (
            index * (THUMB_IMG_SIZE + THUMB_IMG_SPACING) - THUMB_IMG_SIZE / 2 >
            width / 2
        ) {
            smallFlatListRef?.current?.scrollToOffset({
                offset:
                    index * (THUMB_IMG_SIZE + THUMB_IMG_SPACING) -
                    width / 2 +
                    THUMB_IMG_SIZE / 2,
                animated: true,
            });
        } else {
            smallFlatListRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <FlatList
                ref={bigFlatListRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ width, height }}>
                        <Image
                            style={[StyleSheet.absoluteFillObject]}
                            source={{ uri: item.src }}
                        />
                    </View>
                )}
                onMomentumScrollEnd={(e) => {
                    setActiveImageIndex(
                        Math.floor(e.nativeEvent.contentOffset.x / width),
                    );
                }}
            />

            <FlatList
                ref={smallFlatListRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setActiveImageIndex(index)}>
                        <Image
                            style={{
                                ...styles.thumbImage,
                                borderColor:
                                    index === activeIndex
                                        ? '#FFF'
                                        : 'transparent',
                            }}
                            source={{ uri: item.src }}
                        />
                    </TouchableOpacity>
                )}
                style={styles.thumbFaltList}
                contentContainerStyle={styles.thumbFaltListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    thumbImage: {
        width: THUMB_IMG_SIZE,
        height: THUMB_IMG_SIZE,
        marginRight: THUMB_IMG_SPACING,
        borderRadius: THUMB_IMG_SPACING,
        borderWidth: 2,
    },
    thumbFaltList: {
        position: 'absolute',
        bottom: THUMB_IMG_SIZE,
    },
    thumbFaltListContainer: {
        paddingHorizontal: 20,
    },
});

export default App;
