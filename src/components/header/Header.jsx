import { StyleSheet, Text } from "react-native";

/**
 * Render the header title
 * @param {string} gameStatus
 * @param {number} level 
 * @returns 
 */
function Header({ gameStatus, level }) {
    let title = "";
    switch (gameStatus) {
        case "show":
            title = "Press Start";
            break;
        case "started":
            title = "Level " + level;
            break;
        case "over":
            title = "Game Over";
            break;
        default:
            title = "Press Start";
            break;
    }

    return <Text style={styles.header}>{title}</Text>
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "simon",
        fontSize: 32,
        margin: 5,
        color: "#FEF2BF"
    }
});

export default Header;