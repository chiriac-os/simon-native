import { StyleSheet, Text } from "react-native";

/**
 * Render the header title
 * @param {string} gameStatus
 * @param {number} level 
 * @returns 
 */
function Header({ gameStatus, level }) {
    let title = "";
    let subtitle = "";
    switch (gameStatus) {
        case "pending": 
            title = "Simon Game";
            subtitle = "Press Start to play";
            break;
        case "started":
            title = "Level " + level;
            subtitle = "";
            break;
        case "over":
            title = "Game Over";
            subtitle = "Press Start to play again";
            break;
        default:
            throw Error(`Unkown status ${gameStatus}`);
    }

    return (
        <>
            <Text style={[styles.header, styles.title]} testID="title">{title}</Text>
            <Text style={[styles.header, styles.subtitle]} testID="subtitle">{subtitle}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "simon",
        margin: 5,
        textAlign: "center",
        color: "#FEF2BF"
    },
    title: {
        fontSize: 32,
    },
    subtitle: {
        fontSize: 16,
    }
});

export default Header;