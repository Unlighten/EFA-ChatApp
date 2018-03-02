import { Platform, Dimensions } from "react-native";
import metrics from '../../../theme/config/metrics'
import commonColor from "../../../theme/commonColor";

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
        marginVertical: 10,
        borderRadius: 15,
    },

    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: commonColor.borderColor,
        backgroundColor: commonColor.backgroundColor
    },

    text: {
        paddingLeft: 15,
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: '400',
        backgroundColor: commonColor.backgroundColor,
        borderWidth: 2,
        borderColor: commonColor.borderColor,
        right: 4
    }

}