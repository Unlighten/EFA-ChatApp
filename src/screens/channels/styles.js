import { Platform, Dimensions } from "react-native";
import commonColor from "../../../theme/commonColor";
import metrics from "../../../theme/config/metrics";

export default {

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 3, 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    touchable: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: metrics.DEVICE_WIDTH * 0.025,
        marginVertical: metrics.DEVICE_HEIGHT * 0.0075,
    },
    avatar: {
        flex: 2,
        height: null,
        width: null,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
    },

}