import commonColor from "../../../theme/commonColor";

export default {
    username: {
        color: commonColor.brandColor,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: '2%'
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
    messageRow: {
        flexDirection: 'row',
        borderColor: commonColor.brandColor,
        borderTopWidth: 1,
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