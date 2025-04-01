import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bgWrapper: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
  bgWrapperChildren: {
    flex: 1,
  },
  authFormsShadow: {
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.25,
     shadowRadius: 3.5,
     elevation: 5,
    },
  cardLayout: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
   },
  updateModalBLur: {
    position: "absolute",
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0
},
  arrowStyle: {
    marginLeft: 5, 
    marginTop: 3 
},
  updateGoalFormsBlur: { 
    position: "absolute", 
    width: "100%", 
    height: "100%"
}, 
  splashScreenView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
},
});
