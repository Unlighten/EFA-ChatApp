import { Platform, Dimensions } from "react-native";
import commonColor from "../../../theme/commonColor";
import metrics from "../../../theme/config/metrics";

export default {

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    innerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center'
    },

    row: {
        flexDirection: 'row',
        marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
        backgroundColor: commonColor.channel,        
        borderRadius: 15,
        borderColor: commonColor.borderColor,
        borderWidth: 2
    },

    avatar: {
        height: 60,
        width: 60,
        borderRadius: 25
    },

    text: {
        paddingLeft: 20,
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '600',
    }

}