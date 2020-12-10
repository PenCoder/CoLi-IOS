import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    shadow10: {
        elevation: 10,
        shadowColor: '#043309',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    shadow5: {
        elevation: 5,
        shadowColor: '#043309',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    main: {
        backgroundColor: '#DDDDE6',
    },
    scroll: {
        //backgroundColor: '#DDDDE6',
        padding: 0,
    },
    button_rounded: {
        // backgroundColor: '#03A9F4',
        justifyContent: 'center',
        borderRadius: 30,
        marginHorizontal: 15
    },
    ovalShadow: {
        borderRadius: 50,
        marginTop: 60,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        elevation: 6,
        //backgroundColor: 'rgba(250,250,250 ,0.7)',
        transform: [{ scaleX: 2 }]
    },
    rounded: {
        borderRadius: 70,
        marginTop: 60,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        elevation: 6,
        transform: [{ scaleX: 1.5 }]
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 2
    },
    fullScreen: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    full: {
        flex: 1
    },
    card: {
        flex: 1,
        margin: '1%',
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgba(55,71,79 ,0.8)',
        backgroundColor: 'transparent',
        elevation: 5
    },
    card_main: {
        marginBottom: 20,
        // borderRadius: 20,
        backgroundColor: 'white'
    },
    form: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    greyText: {
        color: 'rgba(207,216,220 ,1)'
    },
    transparent: {
        backgroundColor: 'transparent',
        flexWrap: 'wrap'
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap'
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'stretch',
        justifyContent: 'center'
    },
    large_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
        width: '48%',
        elevation: 5
    },
    horizontalCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    spaced: {
        justifyContent: 'space-between'
    },
    line_h: {
        borderRightWidth: 1,
        borderColor: '#c1c1c1',
        height: '100%'
    },
    wrap: {
        flexWrap: 'wrap'
    },

    white_shadow: {
        color: 'white',
        // textShadowColor: 'white',
        // textShadowOffset: {width: 1, height: 0},
        // textShadowRadius: 10,
        fontSize: 20,
        backgroundColor: 'rgba(55, 71, 79,0.3)',
        borderRadius: 10,
        paddingHorizontal: 3,
    },
    blue_shadow: {
        color: 'white',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10,
        fontSize: 20,
        backgroundColor: 'rgba(21, 101, 192,0.5)',
        borderRadius: 10,
        paddingHorizontal: 3
    },
    pads: {
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10
    },
});

export default defaultStyles;