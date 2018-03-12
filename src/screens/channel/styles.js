import { Platform, Dimensions } from "react-native";
import commonColor from "../../../theme/commonColor";
import metrics from "../../../theme/config/metrics";

export default {

    container: {
        flex: 1,
        backgroundColor: commonColor.messagingBackground,
      },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row'
      },
    message: {
        fontSize: 18,
      },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
      },
    footer: {
        flexDirection: 'row',
        backgroundColor: commonColor.messagingInput,
      },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        flex: 5,
      },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10,
      },
    rowText: {
        flex: 1,
      },
    submit: {
      flex: 2,
      backgroundColor: commonColor.brandColor,
      justifyContent: 'center',
    },
    submitText: {
      alignSelf: 'center'
    }

}