import commonColor from "../../../theme/commonColor";

export default {
    container: {
        flex: 1,
        backgroundColor: commonColor.messagingBackground,
    },
    username: {
        color: commonColor.brandColor,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: '2%'
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
    },
    backBtn: {
        backgroundColor: commonColor.brandColor,
        padding: 3
    },
    backText: {
        color: commonColor.inverseTextColor,
        fontSize: 18,
        fontWeight: '600',
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 20,
    },
    rowText: {
        flex: 1,
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: commonColor.brandColor,
        flexDirection: 'row'
    },
    input: {
        flex: 6,
        padding: 2,
        paddingTop: 5,
        paddingBottom: 5,
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
    footer: {
        flexDirection: 'row',
        backgroundColor: commonColor.messagingInput,
    },
}