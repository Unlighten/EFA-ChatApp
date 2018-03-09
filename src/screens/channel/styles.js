import { Platform, Dimensions } from "react-native";
import commonColor from "../../../theme/commonColor";
import metrics from "../../../theme/config/metrics";

export default {

    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
        backgroundColor: '#eee',
      },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        flex: 1,
      },

}