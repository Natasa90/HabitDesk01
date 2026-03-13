import "react-native-gesture-handler"; // MUST be first
import "react-native-reanimated"; // MUST be second
import { registerRootComponent } from "expo";

import App from "./App";

registerRootComponent(App);
