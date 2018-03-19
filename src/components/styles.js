import commonColor from '../../theme/commonColor'

export default {

    container: {
        paddingTop: Expo.Constants.statusBarHeight,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: commonColor.brandColor,
        textAlign: 'center'
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: commonColor.brandColor,
        flexDirection: 'row'
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: commonColor.brandColor,
        fontWeight: '600'
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Expo.Constants.statusBarHeight
    },
    hideModalText: {
        color: commonColor.inverseTextColor,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    hideModalBtn: {
        backgroundColor: commonColor.brandColor,
        padding: 3
    },
    avatar: {
        borderRadius: 40,
        width: 80,
        height: 80,
        marginRight: 20,
    },
    usernameText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 10,
        alignSelf: 'center'
    },
    messageRow: {
        flexDirection: 'row',
        borderColor: commonColor.brandColor,
        borderBottomWidth: 1,
        borderRightWidth: 1
    },
    input: {
        flex: 6,
        padding: 2,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: commonColor.brandColor,
        color: commonColor.inverseTextColor
    },
    submit: {
        flex: 2,
        backgroundColor: commonColor.backgroundColor,
        justifyContent: 'center',
      },
    submitText: {
        alignSelf: 'center',
        fontWeight: '600'
      },

}