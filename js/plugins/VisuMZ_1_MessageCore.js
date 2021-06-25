//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.21] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x42df=['Window_Base_textSizeEx','sYpCO','FastForwardKey','changeTextColor','choiceRows','outlineWidth','addedWidth','VisuMZ_0_CoreEngine','addCommand','lineHeight','jRUno','LineBreakSpace','TextJS','isTriggered','escapeStart','fontSize','ParseItemNotetags','clearFlags','YHeeR','remove','makeData','lwmmu','adjustShowChoiceExtension','_spriteset','message','makeFontSmaller','RAACy','processPyTextCode','placeCancelButton','addMessageCoreCommands','Window_Message_newPage','Actors','call','ConvertParams','newPage','TextManager_message','toUpperCase','kcfsI','isArmor','gainItem','currentExt','messageRows','resetPositionX','_moveTargetX','setFaceImage','Type','initMessageCore','\x1bCOLORLOCK[0]','FontSmallerCap','updatePlacement','index','_dimmerSprite','isItem','setupItemChoice','outLineColor','MessageTextDelay','iconIndex','KgsLj','fontItalic','anchor','_eventId','pXdrS','processCustomWait','boxWidth','_commonEventId','_lastGainedItemData','Name','jYTlD','launchMessageCommonEvent','setMessageWindowRows','convertTextAlignmentEscapeCharacters','setupEvents','GEQGO','ANY','joSZO','MsUSr','return\x20\x27','format','SWITCH','ItzcQ','AddAutoColor','statusText','OqWPn','3AAzoTt','Window_Options_changeVolume','textSizeEx','WSnSp','sort','clamp','selectDefault','\x1bTEXTALIGNMENT[0]','getChoiceListTextAlign','map\x20player','messageCoreWindowX','refresh','_interpreter','_textAlignment','ConfigManager_makeData','MessageWindow','QZkaF','DISABLE','defaultColor','isRTL','<RIGHT>','_relativePosition','makeDeepCopy','_moveDuration','updateForcedPlacement','aDQtN','yZLNG','filter','setPositionType','prototype','onChoice','onProcessCharacter','CENTERPICTURE','initialize','parameters','processStoredAutoColorChanges','xnSDy','outputHeight','pOxiL','maxCommands','obtainItem','PICTURE','choices','parseChoiceText','_autoSizeRegexp','_messageCommonEvents','exit','ARRAYSTRUCT','JFVQs','Armors','setChoiceListMaxColumns','Window_NameBox_updatePlacement','ZbZZX','resetTextColor','setTextDelay','open','_centerMessageWindow','zbDOt','windowX','itemHeight','<I>','textSpeed','fKUxt','Skills','processFsTextCode','\x1bTEXTALIGNMENT[3]','nextEventCode','QkhTw','gEqMo','moveTo','2338610nqiTTm','_texts','gbqdi','\x5c%1','\x1bITALIC[1]','getTextAlignment','battle\x20party','textSizeExTextAlignment','mainFontSize','TextCodeReplace','width','getConfigValue','innerHeight','startWait','rtl','currencyUnit','Window_Message_isTriggered','getLastGainedItemData','Undefined','preFlushTextState','Hbnul','isWeapon','EbAjl','description','Window_ChoiceList_updatePlacement','isCommandEnabled','value','_moveTargetY','PWxWN','Window_Options_isVolumeSymbol','addMessageCommonEvent','processWrapBreak','_colorLock','round','vtebL','drawing','Scene_Options_maxCommands','General','TextAlign','XxzlJ','default','Window_Help_refresh','registerCommand','updateAutoSizePosition','levelUp','COMMONEVENT','ParseAllNotetags','Window_Message_terminateMessage','517676xGEYEI','drawItem','convertMessageCoreEscapeActions','contents','preemptive','Width','prepareShowTextFollowups','isSceneBattle','easeInOut','setRelativePosition','JSON','_messagePositionReset','setMessageWindowWidth','updateMove','ChoiceWindowProperties','_autoPosRegExp','oXSKh','returnPreservedFontSettings','setColorLock','itemPadding','clampPlacementPosition','WordWrap','return\x200','getPreservedFontSettings','choiceCols','getChoiceListLineHeight','NameBoxWindowOffsetY','initTextAlignement','process_VisuMZ_MessageCore_TextMacros','processCharacter','LDIMm','lastGainedObjectName','\x1bWrapBreak[0]','Window_Base_changeTextColor','processTextAlignmentChange','ARRAYEVAL','prepareAutoSizeEscapeCharacters','floor','contentsBack','isColorLocked','getChoiceListMaxColumns','constructor','commandSymbol','isMessageWindowWordWrap','changeValue','_textDelayCount','Window_Base_processControlCharacter','databaseObjectName','Weapons','LxqjO','setupChoices','ActionJS','convertEscapeCharacters','false','maxChoiceWidth','isSceneMap','setChoiceListMaxRows','jYkvu','parse','844876PSASEf','Game_System_initialize','updateNameBoxMove','messageCoreTextSpeed','vFBEy','Game_Party_gainItem','convertFontSettingsEscapeCharacters','processFontChangeItalic','center','commandName','Items','windowWidth','AutoColor','<CENTER>','convertVariableEscapeCharacters','MessageRows','oWvuz','fontFace','changeVolume','Game_Map_updateEvents','\x1bBOLD[1]','ZrBYv','</B>','<LINE\x20BREAK>','ChoiceWindowMaxCols','_wholeMoveDuration','clearActorNameAutoColor','Settings','map','IpSaC','calcMoveEasing','WAIT','processTextAlignmentX','process_VisuMZ_MessageCore_TextCodes_Action','createContents','vVUiU','ceil','TextCodeActions','includes','bind','messageWidth','StretchDimmedBg','COLORLOCK','</I>','SZOWT','inBattle','setBackground','IviGW','isHelpWindowWordWrap','helpWordWrap','\x1bi[%1]%2','makeFontBigger','registerResetRect','max','update','_messageWindow','ARRAYFUNC','ParseClassNotetags','replace','follower','faceName','\x1bTEXTALIGNMENT[2]','Scene_Boot_onDatabaseLoaded','battle\x20actor','lSZAZ','Window_Message_processEscapeCharacter','rbBQl','TCuIr','sZoIt','windowPadding','TEXTALIGNMENT','convertBackslashCharacters','Game_Map_setupEvents','followers','choice','rOZPV','FViKT','getMessageWindowWidth','TextStr','processFontChangeBold','boxHeight','\x1bBOLD[0]','IBmyp','map\x20party','processPxTextCode','textCodeCheck','status','_list','ChoiceWindowMaxRows','Game_Interpreter_setupChoices','exec','processEscapeCharacter','none','obtainEscapeParam','_textColorStack','lastGainedObjectQuantity','resetFontSettings','obtainEscapeString','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NameBoxWindowOffsetX','defeat','MaxRows','getMessageWindowRows','hpIrm','States','setWordWrap','iCDaD','2loHEzG','moveBy','isAutoColorAffected','Window_Base_processEscapeCharacter','sNYIY','choiceTextAlign','callOkHandler','faceWidth','setMessageWindowWordWrap','convertTextMacros','outputWidth','addExtraShowChoices','currentCommand','jOwDX','ZYTBF','processAutoPosition','_MessageCoreSettings','process_VisuMZ_MessageCore_TextCodes_Replace','_scene','CommonEvent','textColor','updateDimensions','maxFontSizeInLine','quantity','NGjRr','_moveTargetHeight','_moveTargetWidth','TextColor','calcWindowHeight','updateOffsetPosition','maxCols','Classes','prepareWordWrapEscapeCharacters','setup','Window_Base_processNewLine','ParseSkillNotetags','iHuwx','toLowerCase','isVolumeSymbol','postFlushTextState','event','_index','HjdnF','preConvertEscapeCharacters','choiceLineHeight','innerWidth','canMove','addContinuousShowTextCommands','irFBQ','Game_Party_initialize','sNJQL','CreateAutoColorRegExpLists','processAllText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','battle\x20enemy','<COLORLOCK>','[0]','processActorNameAutoColorChanges','addWrapBreakAfterPunctuation','changeOutlineColor','(((','Window_Base_processAllText','min','ChoiceWindowLineHeight','updateBackground','addedHeight','WRAPBREAK','synchronizeNameBox','processNewLine','list','_autoPositionTarget','ParseStateNotetags','TightWrap','messageWordWrap','124658LHYigL','DefaultOutlineWidth','stretchDimmerSprite','GqBOE','Center','resetWordWrap','easeOut','emAAj','Window_Base_initialize','processPreviousColor','TextMacros','outlineColor','YEeJa','Window_Message_synchronizeNameBox','push','629353EwdvMi','\x1bC[%1]%2\x1bPREVCOLOR[0]','</COLORLOCK>','right','FontChangeValue','WXuHa','convertShowChoiceEscapeCodes','mIrRY','slice','type',')))','openness','processCommonEvent','_cancelButton','303761oSrliX','Game_Map_initialize','_resetRect','terminateMessage','<%1>','setChoiceListLineHeight','ConvertTextAutoColorRegExpFriendly','padding','nssAK','maxLines','activate','addMessageCoreTextSpeedCommand','loadPicture','Default','match','length','addContinuousShowChoices','textSpeedStatusText','processDrawCenteredPicture','textCodeResult','isChoiceVisible','updateTransform','\x1bTEXTALIGNMENT','drawTextEx','_wordWrap','_indent','clear','updateMessageCommonEvents','ARRAYJSON','version','isChoiceEnabled','name','applyDatabaseAutoColor','processControlCharacter','Window_Message_updatePlacement','uUFRV','createTextState','refreshDimmerBitmap','kvGZJ','left','itemRectWithPadding','setTextAlignment','setChoiceListTextAlign','map\x20event','convertMessageCoreEscapeReplacements','actorName','_nameBoxWindow','AddOption','Tfxoi','changeTextSpeed','_autoSizeCheck','666797McQilD','substring','ParseWeaponNotetags','STRUCT','ParseArmorNotetags','CreateAutoColorFor','KqKLI','emerge','processAutoSize','addLoadListener','isWordWrapEnabled','onDatabaseLoaded','textSizeExWordWrap','split','_moveEasingType','qvewR','</RIGHT>','resetRect','choicePositionType','oKNsj','isContinuePrepareShowTextCommands','zBwln','ParseEnemyNotetags','process_VisuMZ_MessageCore_AutoColor','EmQED','easeIn','postConvertEscapeCharacters','code','YaLoA','adjustShowChoiceDefault','trim','</WORDWRAP>','mzKcq','height','actor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isBreakShowTextCommands','ITALIC','\x1bITALIC[0]','_forcedPosition','TextSpeed','prepareForcedPositionEscapeCharacters','blt','test','updateAutoPosition','kaGJZ','Window_Options_addGeneralOptions','updateRelativePosition','convertLockColorsEscapeCharacters','dpDNO','processDrawPicture','CreateAutoColorRegExpListEntries','applyData','drawBackPicture','cJpLV','Window_Base_update','setLastGainedItemData','getChoiceListMaxRows','AutoColorRegExp','Window_NameBox_refresh','Instant','addGeneralOptions','BOLD','oCdYi','updateOverlappingY','ChoiceWindowTextAlign','JJmGr','shift','applyMoveEasing','paintOpacity','Window_ChoiceList_windowX','MessageCore','qxwBP','Sahlr','updateEvents','members','Enemies','AutoColorBypassList','<LEFT>','setSpeakerName','cgAOX','ZSYdW','AMyvd','Match','processMessageCoreEscapeActions','SortObjectByKeyLength','processAutoColorWords','AdjustRect','Rows','join','splice','AqfZh','startX','onNewPageMessageCore','processColorLock','convertBaseEscapeCharacters','instantTextSpeed','BjRBJ','indexOf','partyMemberName','\x1bCOLORLOCK[1]','EVAL','QXCBE','text','GcCjJ','registerActorNameAutoColorChanges','isRunning','ConfigManager_applyData','MYkYG','dfiub','clearCommandList','FontBiggerCap','vcgyl','_autoColorActorNames','adjustShowChoiceCancel','drawBackCenteredPicture','fontBold','RelativePXPY','Window_Options_statusText'];const _0x17a7f4=_0x4ac9;(function(_0x10547a,_0x32c181){const _0xde54=_0x4ac9;while(!![]){try{const _0x3db794=parseInt(_0xde54(0x2f8))+-parseInt(_0xde54(0x11e))*parseInt(_0xde54(0x177))+parseInt(_0xde54(0x185))*parseInt(_0xde54(0x282))+-parseInt(_0xde54(0x168))+-parseInt(_0xde54(0x1b8))+-parseInt(_0xde54(0x333))+parseInt(_0xde54(0x2c8));if(_0x3db794===_0x32c181)break;else _0x10547a['push'](_0x10547a['shift']());}catch(_0x32d3af){_0x10547a['push'](_0x10547a['shift']());}}}(_0x42df,0xd5054));var label=_0x17a7f4(0x1ff),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x17a7f4(0x29d)](function(_0x523a2e){const _0x3f5efe=_0x17a7f4;return _0x523a2e[_0x3f5efe(0x389)]&&_0x523a2e[_0x3f5efe(0x2df)][_0x3f5efe(0x359)]('['+label+']');})[0x0];function _0x4ac9(_0x534f70,_0x4ccb84){_0x534f70=_0x534f70-0x112;let _0x42df99=_0x42df[_0x534f70];return _0x42df99;}VisuMZ[label][_0x17a7f4(0x34e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x17a7f4(0x250)]=function(_0x2d19ab,_0x302d53){const _0x227c23=_0x17a7f4;for(const _0x5d5e38 in _0x302d53){if(_0x5d5e38[_0x227c23(0x193)](/(.*):(.*)/i)){const _0x3f93dd=String(RegExp['$1']),_0x5aa5b7=String(RegExp['$2'])[_0x227c23(0x253)]()[_0x227c23(0x1d6)]();let _0x2ce607,_0x398a3d,_0x1141f7;switch(_0x5aa5b7){case'NUM':_0x2ce607=_0x302d53[_0x5d5e38]!==''?Number(_0x302d53[_0x5d5e38]):0x0;break;case'ARRAYNUM':_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON[_0x227c23(0x332)](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d['map'](_0x16caa1=>Number(_0x16caa1));break;case _0x227c23(0x21d):_0x2ce607=_0x302d53[_0x5d5e38]!==''?eval(_0x302d53[_0x5d5e38]):null;break;case _0x227c23(0x31b):_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON[_0x227c23(0x332)](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d[_0x227c23(0x34f)](_0x28a20c=>eval(_0x28a20c));break;case _0x227c23(0x302):_0x2ce607=_0x302d53[_0x5d5e38]!==''?JSON['parse'](_0x302d53[_0x5d5e38]):'';break;case _0x227c23(0x1a1):_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON['parse'](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d['map'](_0x185f06=>JSON[_0x227c23(0x332)](_0x185f06));break;case'FUNC':_0x2ce607=_0x302d53[_0x5d5e38]!==''?new Function(JSON['parse'](_0x302d53[_0x5d5e38])):new Function(_0x227c23(0x30e));break;case _0x227c23(0x36b):_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON['parse'](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d[_0x227c23(0x34f)](_0x45cade=>new Function(JSON['parse'](_0x45cade)));break;case'STR':_0x2ce607=_0x302d53[_0x5d5e38]!==''?String(_0x302d53[_0x5d5e38]):'';break;case'ARRAYSTR':_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON[_0x227c23(0x332)](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d[_0x227c23(0x34f)](_0x21b4c3=>String(_0x21b4c3));break;case _0x227c23(0x1bb):_0x1141f7=_0x302d53[_0x5d5e38]!==''?JSON[_0x227c23(0x332)](_0x302d53[_0x5d5e38]):{},_0x2d19ab[_0x3f93dd]={},VisuMZ['ConvertParams'](_0x2d19ab[_0x3f93dd],_0x1141f7);continue;case _0x227c23(0x2b1):_0x398a3d=_0x302d53[_0x5d5e38]!==''?JSON[_0x227c23(0x332)](_0x302d53[_0x5d5e38]):[],_0x2ce607=_0x398a3d['map'](_0x34f243=>VisuMZ[_0x227c23(0x250)]({},JSON[_0x227c23(0x332)](_0x34f243)));break;default:continue;}_0x2d19ab[_0x3f93dd]=_0x2ce607;}}return _0x2d19ab;},(_0x21a5da=>{const _0x5f539a=_0x17a7f4,_0x35ef57=_0x21a5da[_0x5f539a(0x1a4)];for(const _0x2bb81a of dependencies){if(!Imported[_0x2bb81a]){if(_0x5f539a(0x329)==='RafqP'){function _0x12bbab(){const _0x81444=_0x5f539a,_0x46dad9=_0x268faf[_0x81444(0x2d9)]();if(_0x46dad9['id']<=0x0)return'';return _0x46dad9[_0x81444(0x135)];}}else{alert(_0x5f539a(0x1db)[_0x5f539a(0x27c)](_0x35ef57,_0x2bb81a)),SceneManager['exit']();break;}}}const _0x3872c0=_0x21a5da[_0x5f539a(0x2df)];if(_0x3872c0[_0x5f539a(0x193)](/\[Version[ ](.*?)\]/i)){if('pOxiL'!==_0x5f539a(0x2a8)){function _0x43a632(){return![];}}else{const _0x4ce3bf=Number(RegExp['$1']);if(_0x4ce3bf!==VisuMZ[label][_0x5f539a(0x1a2)]){if(_0x5f539a(0x376)===_0x5f539a(0x376))alert(_0x5f539a(0x115)['format'](_0x35ef57,_0x4ce3bf)),SceneManager['exit']();else{function _0x1f6af5(){const _0x289abd=_0x5f539a;_0x4baf68['x']+=_0x5eca5f[_0x289abd(0x214)];}}}}}if(_0x3872c0[_0x5f539a(0x193)](/\[Tier[ ](\d+)\]/i)){const _0x2e2a21=Number(RegExp['$1']);_0x2e2a21<tier?(alert(_0x5f539a(0x153)['format'](_0x35ef57,_0x2e2a21,tier)),SceneManager[_0x5f539a(0x2b0)]()):tier=Math[_0x5f539a(0x368)](_0x2e2a21,tier);}VisuMZ[_0x5f539a(0x250)](VisuMZ[label][_0x5f539a(0x34e)],_0x21a5da['parameters']);})(pluginData),PluginManager[_0x17a7f4(0x2f2)](pluginData[_0x17a7f4(0x1a4)],_0x17a7f4(0x306),_0x4a5280=>{const _0xc4c648=_0x17a7f4;VisuMZ['ConvertParams'](_0x4a5280,_0x4a5280);const _0x1a1405=_0x4a5280['LineHeight']||$gameSystem[_0xc4c648(0x311)]()||0x1,_0x9b5cfc=_0x4a5280[_0xc4c648(0x118)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x3d3902=_0x4a5280['MaxCols']||$gameSystem[_0xc4c648(0x320)]()||0x1,_0x386546=_0x4a5280[_0xc4c648(0x2ee)][_0xc4c648(0x143)]()||_0xc4c648(0x2f0);$gameSystem[_0xc4c648(0x18a)](_0x1a1405),$gameSystem[_0xc4c648(0x330)](_0x9b5cfc),$gameSystem[_0xc4c648(0x2b4)](_0x3d3902),$gameSystem[_0xc4c648(0x1af)](_0x386546);}),PluginManager[_0x17a7f4(0x2f2)](pluginData[_0x17a7f4(0x1a4)],'MessageWindowProperties',_0x156d84=>{const _0xf4c7ee=_0x17a7f4;VisuMZ[_0xf4c7ee(0x250)](_0x156d84,_0x156d84);const _0x148565=_0x156d84[_0xf4c7ee(0x210)]||$gameSystem['getMessageWindowRows']()||0x1,_0x135a01=_0x156d84[_0xf4c7ee(0x2fd)]||$gameSystem[_0xf4c7ee(0x380)]()||0x1;$gameTemp['_centerMessageWindow']=_0x156d84[_0xf4c7ee(0x16c)]||![];const _0x585b56=_0x156d84['WordWrap'][_0xf4c7ee(0x143)]();$gameSystem[_0xf4c7ee(0x274)](_0x148565),$gameSystem['setMessageWindowWidth'](_0x135a01);['true',_0xf4c7ee(0x32d)][_0xf4c7ee(0x359)](_0x585b56)&&$gameSystem[_0xf4c7ee(0x126)](eval(_0x585b56));const _0x1308f=SceneManager[_0xf4c7ee(0x130)][_0xf4c7ee(0x36a)];_0x1308f&&(_0x1308f[_0xf4c7ee(0x16d)](),_0x1308f[_0xf4c7ee(0x133)](),_0x1308f[_0xf4c7ee(0x355)]());}),VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x371)]=Scene_Boot[_0x17a7f4(0x29f)][_0x17a7f4(0x1c3)],Scene_Boot['prototype'][_0x17a7f4(0x1c3)]=function(){const _0x49884c=_0x17a7f4;VisuMZ[_0x49884c(0x1ff)][_0x49884c(0x371)][_0x49884c(0x24f)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x49884c(0x314)](),this[_0x49884c(0x1cf)]();},VisuMZ[_0x17a7f4(0x1ff)]['SortObjectByKeyLength']=function(_0x558519){const _0x31a9c4=_0x17a7f4,_0x43cf81=VisuMZ[_0x31a9c4(0x1ff)]['Settings'][_0x558519];_0x43cf81[_0x31a9c4(0x286)]((_0x1cd87b,_0x592ea8)=>{const _0x1f8215=_0x31a9c4;if(_0x1f8215(0x11d)==='oxIeX'){function _0xa4eddf(){const _0x6df153=_0x1f8215;_0x497042=_0x447bf8[_0x6df153(0x36d)](/[\n\r]+/g,'\x20'),_0x4881f7=_0x53cc3f[_0x6df153(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');}}else{if(!_0x1cd87b||!_0x592ea8)return-0x1;return _0x592ea8['Match']['length']-_0x1cd87b[_0x1f8215(0x20b)]['length'];}});},Scene_Boot[_0x17a7f4(0x29f)][_0x17a7f4(0x354)]=function(){const _0x284562=_0x17a7f4;VisuMZ[_0x284562(0x1ff)][_0x284562(0x20d)]('TextCodeActions');for(const _0x2c9490 of VisuMZ[_0x284562(0x1ff)]['Settings'][_0x284562(0x358)]){if(_0x284562(0x2a6)!=='TOiAc'){_0x2c9490[_0x284562(0x20b)]=_0x2c9490['Match'][_0x284562(0x253)](),_0x2c9490[_0x284562(0x388)]=new RegExp('\x1b'+_0x2c9490[_0x284562(0x20b)],'gi'),_0x2c9490['textCodeResult']='\x1b'+_0x2c9490[_0x284562(0x20b)];if(_0x2c9490[_0x284562(0x25c)]==='')_0x2c9490['textCodeResult']+='[0]';}else{function _0x1c3ebd(){const _0x30b95b=_0x284562;for(const _0x4e6202 of _0x3b46f0[_0x30b95b(0x1ff)][_0x30b95b(0x34e)]['TextCodeActions']){if(_0x4e6202[_0x30b95b(0x20b)]===_0x1a31f0){if(_0x4e6202[_0x30b95b(0x25c)]==='')this['obtainEscapeParam'](_0x11d520);_0x4e6202['ActionJS'][_0x30b95b(0x24f)](this,_0x45ea18);if(this[_0x30b95b(0x321)]===_0x181959){const _0x1b2005=_0x4e6202[_0x30b95b(0x131)]||0x0;if(_0x1b2005>0x0)this[_0x30b95b(0x273)](_0x1b2005);}}}}}}},Scene_Boot[_0x17a7f4(0x29f)][_0x17a7f4(0x12f)]=function(){const _0x453d48=_0x17a7f4;VisuMZ[_0x453d48(0x1ff)][_0x453d48(0x20d)]('TextCodeReplace');for(const _0x36509a of VisuMZ[_0x453d48(0x1ff)][_0x453d48(0x34e)]['TextCodeReplace']){_0x36509a['textCodeCheck']=new RegExp('\x1b'+_0x36509a[_0x453d48(0x20b)]+_0x36509a['Type'],'gi'),_0x36509a[_0x453d48(0x381)]!==''&&_0x36509a[_0x453d48(0x381)]!==_0x453d48(0x2da)?_0x36509a[_0x453d48(0x198)]=new Function(_0x453d48(0x27b)+_0x36509a[_0x453d48(0x381)][_0x453d48(0x36d)](/\\/g,'\x1b')+'\x27'):_0x36509a[_0x453d48(0x198)]=_0x36509a[_0x453d48(0x23b)];}},Scene_Boot[_0x17a7f4(0x29f)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x4f45a6=_0x17a7f4;for(const _0x406541 of VisuMZ['MessageCore'][_0x4f45a6(0x34e)][_0x4f45a6(0x172)]){_0x406541[_0x4f45a6(0x388)]=new RegExp('\x5c['+_0x406541[_0x4f45a6(0x20b)]+'\x5c]','gi'),_0x406541[_0x4f45a6(0x381)]!==''&&_0x406541[_0x4f45a6(0x381)]!==_0x4f45a6(0x2da)?_0x406541[_0x4f45a6(0x198)]=new Function('return\x20\x27'+_0x406541[_0x4f45a6(0x381)][_0x4f45a6(0x36d)](/\\/g,'\x1b')+'\x27'):_0x406541['textCodeResult']=_0x406541[_0x4f45a6(0x23b)];}},Scene_Boot['prototype'][_0x17a7f4(0x1cf)]=function(){const _0x395711=_0x17a7f4,_0x2ae883=VisuMZ[_0x395711(0x1ff)][_0x395711(0x34e)][_0x395711(0x33f)];!VisuMZ[_0x395711(0x2f6)]&&(VisuMZ[_0x395711(0x1ff)]['AddAutoColor']($dataClasses,_0x2ae883[_0x395711(0x13d)]),VisuMZ[_0x395711(0x1ff)]['AddAutoColor']($dataSkills,_0x2ae883['Skills']),VisuMZ[_0x395711(0x1ff)][_0x395711(0x27f)]($dataItems,_0x2ae883[_0x395711(0x33d)]),VisuMZ[_0x395711(0x1ff)]['AddAutoColor']($dataWeapons,_0x2ae883['Weapons']),VisuMZ[_0x395711(0x1ff)]['AddAutoColor']($dataArmors,_0x2ae883[_0x395711(0x2b3)]),VisuMZ[_0x395711(0x1ff)][_0x395711(0x27f)]($dataEnemies,_0x2ae883[_0x395711(0x204)]),VisuMZ[_0x395711(0x1ff)][_0x395711(0x27f)]($dataStates,_0x2ae883[_0x395711(0x11b)])),VisuMZ['MessageCore'][_0x395711(0x151)]();},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x205)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x17a7f4(0x349),_0x17a7f4(0x2be),_0x17a7f4(0x35e),_0x17a7f4(0x206),'</LEFT>',_0x17a7f4(0x340),'</CENTER>',_0x17a7f4(0x296),_0x17a7f4(0x1c8),_0x17a7f4(0x155),_0x17a7f4(0x179),_0x17a7f4(0x15a),_0x17a7f4(0x181),'<WORDWRAP>',_0x17a7f4(0x1d7),'<BR>',_0x17a7f4(0x34a),_0x17a7f4(0x2ab),'CENTERPICTURE',_0x17a7f4(0x2f5),_0x17a7f4(0x352),'SHOW','HIDE','ENABLE',_0x17a7f4(0x293),_0x17a7f4(0x27d),'SWITCHES','ALL',_0x17a7f4(0x278)],VisuMZ[_0x17a7f4(0x1ff)]['AddAutoColor']=function(_0x5e6356,_0x1d6146){const _0x1f7993=_0x17a7f4;if(_0x1d6146<=0x0)return;const _0x1005fc=_0x5e6356;for(const _0x1c47e4 of _0x1005fc){if(!_0x1c47e4)continue;VisuMZ[_0x1f7993(0x1ff)][_0x1f7993(0x1bd)](_0x1c47e4,_0x1d6146);}},VisuMZ['MessageCore'][_0x17a7f4(0x151)]=function(){const _0x1e41d8=_0x17a7f4;VisuMZ[_0x1e41d8(0x1ff)][_0x1e41d8(0x1f2)]=[];for(let _0x239fc0=0x1;_0x239fc0<=0x1f;_0x239fc0++){if(_0x1e41d8(0x350)==='cYyGH'){function _0x97693e(){const _0x1c5367=_0x1e41d8;this['_interpreter'][_0x1c5367(0x369)]();}}else{const _0x274fcb='TextColor%1'[_0x1e41d8(0x27c)](_0x239fc0),_0xb71e38=VisuMZ[_0x1e41d8(0x1ff)][_0x1e41d8(0x34e)][_0x1e41d8(0x33f)][_0x274fcb];_0xb71e38['sort']((_0x5edd0f,_0x5a6b9f)=>{const _0x392a7c=_0x1e41d8;if(_0x392a7c(0x37e)!==_0x392a7c(0x241)){if(!_0x5edd0f||!_0x5a6b9f)return-0x1;return _0x5a6b9f[_0x392a7c(0x194)]-_0x5edd0f['length'];}else{function _0x374d3e(){const _0x508e0a=_0x392a7c;_0x308e5a[_0x508e0a(0x1ff)]['Window_Base_update'][_0x508e0a(0x24f)](this),this['updateMove']();}}}),this[_0x1e41d8(0x1eb)](_0xb71e38,_0x239fc0);}}},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x1eb)]=function(_0x142a79,_0x3b4905){const _0x5dd2e1=_0x17a7f4;for(const _0x2ed2f0 of _0x142a79){if(_0x2ed2f0[_0x5dd2e1(0x194)]<=0x0)continue;if(/^\d+$/['test'](_0x2ed2f0))continue;let _0x589341=VisuMZ['MessageCore'][_0x5dd2e1(0x18b)](_0x2ed2f0);if(_0x2ed2f0[_0x5dd2e1(0x193)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if('vuESo'==='ykfcx'){function _0x488bf7(){const _0x2204d0=_0x5dd2e1,_0xa17bec=_0x2b6688[_0x2204d0(0x332)]('['+_0x1a8a54['$1'][_0x2204d0(0x193)](/\d+/g)+']');for(const _0x2cf21d of _0xa17bec){if(_0x1a378c[_0x2204d0(0x2e2)](_0x2cf21d))return![];}return!![];}}else var _0x5888d3=new RegExp(_0x589341,'i');}else{if(_0x5dd2e1(0x1f7)!==_0x5dd2e1(0x1cd))var _0x5888d3=new RegExp('\x5cb'+_0x589341+'\x5cb','g');else{function _0x284583(){const _0x3253df=_0x5dd2e1,_0x4ebed1=this[_0x3253df(0x390)](_0x7cce8);if(_0x3eeda5[_0x3253df(0x2eb)])this['setColorLock'](_0x4ebed1>0x0);}}}VisuMZ['MessageCore']['AutoColorRegExp'][_0x5dd2e1(0x176)]([_0x5888d3,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5dd2e1(0x27c)](_0x3b4905,_0x2ed2f0)]);}},VisuMZ['MessageCore'][_0x17a7f4(0x18b)]=function(_0xdbf1a9){const _0x109563=_0x17a7f4;return _0xdbf1a9=_0xdbf1a9[_0x109563(0x36d)](/(\W)/gi,(_0x2059f1,_0x4f8fb4)=>_0x109563(0x2cb)[_0x109563(0x27c)](_0x4f8fb4)),_0xdbf1a9;},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x36c)]=VisuMZ[_0x17a7f4(0x36c)],VisuMZ[_0x17a7f4(0x36c)]=function(_0x208f8c){const _0x38ed35=_0x17a7f4;VisuMZ[_0x38ed35(0x1ff)][_0x38ed35(0x36c)][_0x38ed35(0x24f)](this,_0x208f8c);const _0x121fb3=VisuMZ[_0x38ed35(0x1ff)][_0x38ed35(0x34e)][_0x38ed35(0x33f)];VisuMZ[_0x38ed35(0x1ff)][_0x38ed35(0x1bd)](_0x208f8c,_0x121fb3['Classes']);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x141)]=VisuMZ[_0x17a7f4(0x141)],VisuMZ[_0x17a7f4(0x141)]=function(_0x3dfe00){const _0x321a1d=_0x17a7f4;VisuMZ[_0x321a1d(0x1ff)][_0x321a1d(0x141)][_0x321a1d(0x24f)](this,_0x3dfe00);const _0x337eec=VisuMZ[_0x321a1d(0x1ff)]['Settings']['AutoColor'];VisuMZ[_0x321a1d(0x1ff)][_0x321a1d(0x1bd)](_0x3dfe00,_0x337eec[_0x321a1d(0x2c1)]);},VisuMZ[_0x17a7f4(0x1ff)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0x17a7f4(0x23f)]=function(_0x97c699){const _0x522a11=_0x17a7f4;VisuMZ[_0x522a11(0x1ff)]['ParseItemNotetags']['call'](this,_0x97c699);const _0x59ea4d=VisuMZ[_0x522a11(0x1ff)]['Settings']['AutoColor'];VisuMZ[_0x522a11(0x1ff)]['CreateAutoColorFor'](_0x97c699,_0x59ea4d[_0x522a11(0x33d)]);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x1ba)]=VisuMZ[_0x17a7f4(0x1ba)],VisuMZ[_0x17a7f4(0x1ba)]=function(_0x43c919){const _0x5be9ee=_0x17a7f4;VisuMZ[_0x5be9ee(0x1ff)]['ParseWeaponNotetags'][_0x5be9ee(0x24f)](this,_0x43c919);const _0x35c220=VisuMZ[_0x5be9ee(0x1ff)]['Settings'][_0x5be9ee(0x33f)];VisuMZ[_0x5be9ee(0x1ff)][_0x5be9ee(0x1bd)](_0x43c919,_0x35c220[_0x5be9ee(0x328)]);},VisuMZ['MessageCore']['ParseArmorNotetags']=VisuMZ[_0x17a7f4(0x1bc)],VisuMZ['ParseArmorNotetags']=function(_0x17d6e2){const _0x155040=_0x17a7f4;VisuMZ[_0x155040(0x1ff)][_0x155040(0x1bc)][_0x155040(0x24f)](this,_0x17d6e2);const _0x2d4af2=VisuMZ[_0x155040(0x1ff)][_0x155040(0x34e)]['AutoColor'];VisuMZ['MessageCore'][_0x155040(0x1bd)](_0x17d6e2,_0x2d4af2[_0x155040(0x2b3)]);},VisuMZ[_0x17a7f4(0x1ff)]['ParseEnemyNotetags']=VisuMZ[_0x17a7f4(0x1ce)],VisuMZ[_0x17a7f4(0x1ce)]=function(_0x3ed07b){const _0xf971ea=_0x17a7f4;VisuMZ[_0xf971ea(0x1ff)][_0xf971ea(0x1ce)]['call'](this,_0x3ed07b);const _0x84c811=VisuMZ[_0xf971ea(0x1ff)][_0xf971ea(0x34e)][_0xf971ea(0x33f)];VisuMZ['MessageCore'][_0xf971ea(0x1bd)](_0x3ed07b,_0x84c811[_0xf971ea(0x204)]);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x165)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x17a7f4(0x165)]=function(_0x5b9181){const _0x5c4e79=_0x17a7f4;VisuMZ[_0x5c4e79(0x1ff)]['ParseStateNotetags'][_0x5c4e79(0x24f)](this,_0x5b9181);const _0x22b259=VisuMZ['MessageCore']['Settings'][_0x5c4e79(0x33f)];VisuMZ[_0x5c4e79(0x1ff)]['CreateAutoColorFor'](_0x5b9181,_0x22b259[_0x5c4e79(0x11b)]);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x1bd)]=function(_0x53c39f,_0x473a45){const _0x180e39=_0x17a7f4;if(_0x473a45<=0x0)return;const _0x392ade=VisuMZ['MessageCore'][_0x180e39(0x34e)]['AutoColor'][_0x180e39(0x139)+_0x473a45];let _0x4e780a=_0x53c39f['name'][_0x180e39(0x1d6)]();if(/^\d+$/[_0x180e39(0x1e3)](_0x4e780a))return;if(VisuMZ['MessageCore'][_0x180e39(0x205)][_0x180e39(0x359)](_0x4e780a[_0x180e39(0x253)]()))return;_0x4e780a=_0x4e780a[_0x180e39(0x36d)](/\\I\[(\d+)\]/gi,''),_0x4e780a=_0x4e780a[_0x180e39(0x36d)](/\x1bI\[(\d+)\]/gi,'');if(_0x4e780a[_0x180e39(0x194)]<=0x0)return;if(_0x4e780a['match'](/-----/i))return;_0x392ade[_0x180e39(0x176)](_0x4e780a);},SceneManager[_0x17a7f4(0x2ff)]=function(){const _0x55a9bf=_0x17a7f4;return this['_scene']&&this[_0x55a9bf(0x130)][_0x55a9bf(0x321)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0xca0614=_0x17a7f4;return this[_0xca0614(0x130)]&&this[_0xca0614(0x130)]['constructor']===Scene_Map;},VisuMZ['MessageCore'][_0x17a7f4(0x252)]=TextManager[_0x17a7f4(0x247)],TextManager[_0x17a7f4(0x247)]=function(_0x5224c4){const _0x29eba5=_0x17a7f4,_0x36cd25=[_0x29eba5(0x2f4),_0x29eba5(0x1bf),_0x29eba5(0x2fc),'surprise','victory',_0x29eba5(0x117),_0x29eba5(0x23d),'obtainExp','obtainGold',_0x29eba5(0x2aa)];let _0x49d06d=VisuMZ[_0x29eba5(0x1ff)][_0x29eba5(0x252)][_0x29eba5(0x24f)](this,_0x5224c4);return _0x36cd25[_0x29eba5(0x359)](_0x5224c4)&&(_0x49d06d=_0x29eba5(0x1d7)+_0x49d06d),_0x49d06d;},ConfigManager[_0x17a7f4(0x2bf)]=VisuMZ[_0x17a7f4(0x1ff)]['Settings'][_0x17a7f4(0x1e0)]['Default'],VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x290)]=ConfigManager[_0x17a7f4(0x243)],ConfigManager[_0x17a7f4(0x243)]=function(){const _0xd90724=_0x17a7f4,_0x2aeb10=VisuMZ[_0xd90724(0x1ff)][_0xd90724(0x290)][_0xd90724(0x24f)](this);return _0x2aeb10[_0xd90724(0x2bf)]=this['textSpeed'],_0x2aeb10;},VisuMZ[_0x17a7f4(0x1ff)]['ConfigManager_applyData']=ConfigManager[_0x17a7f4(0x1ec)],ConfigManager['applyData']=function(_0x3acf92){const _0x5155a7=_0x17a7f4;VisuMZ[_0x5155a7(0x1ff)][_0x5155a7(0x223)][_0x5155a7(0x24f)](this,_0x3acf92),_0x5155a7(0x2bf)in _0x3acf92?this[_0x5155a7(0x2bf)]=Number(_0x3acf92[_0x5155a7(0x2bf)])[_0x5155a7(0x287)](0x1,0xb):this[_0x5155a7(0x2bf)]=VisuMZ[_0x5155a7(0x1ff)][_0x5155a7(0x34e)]['TextSpeed'][_0x5155a7(0x192)];},TextManager[_0x17a7f4(0x336)]=VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x34e)][_0x17a7f4(0x1e0)][_0x17a7f4(0x271)],TextManager[_0x17a7f4(0x218)]=VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x34e)]['TextSpeed'][_0x17a7f4(0x1f4)],VisuMZ['MessageCore']['Game_System_initialize']=Game_System['prototype']['initialize'],Game_System[_0x17a7f4(0x29f)]['initialize']=function(){const _0x1d64f0=_0x17a7f4;VisuMZ['MessageCore']['Game_System_initialize'][_0x1d64f0(0x24f)](this),this[_0x1d64f0(0x25d)]();},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x25d)]=function(){const _0x115524=_0x17a7f4,_0x239698=VisuMZ['MessageCore']['Settings'][_0x115524(0x2ed)],_0x51d953=VisuMZ[_0x115524(0x1ff)][_0x115524(0x34e)][_0x115524(0x30d)];this[_0x115524(0x12e)]={'messageRows':_0x239698[_0x115524(0x342)],'messageWidth':_0x239698['MessageWidth'],'messageWordWrap':_0x51d953[_0x115524(0x291)],'helpWordWrap':_0x51d953['HelpWindow'],'choiceLineHeight':_0x239698[_0x115524(0x15d)],'choiceRows':_0x239698[_0x115524(0x38b)],'choiceCols':_0x239698[_0x115524(0x34b)],'choiceTextAlign':_0x239698[_0x115524(0x1f9)]};},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x119)]=function(){const _0x5c8abc=_0x17a7f4;if(this[_0x5c8abc(0x12e)]===undefined)this[_0x5c8abc(0x25d)]();if(this[_0x5c8abc(0x12e)][_0x5c8abc(0x258)]===undefined)this[_0x5c8abc(0x25d)]();return this[_0x5c8abc(0x12e)][_0x5c8abc(0x258)];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x274)]=function(_0x86722){const _0x40670f=_0x17a7f4;if(this[_0x40670f(0x12e)]===undefined)this[_0x40670f(0x25d)]();if(this[_0x40670f(0x12e)]['messageRows']===undefined)this['initMessageCore']();this[_0x40670f(0x12e)][_0x40670f(0x258)]=_0x86722||0x1;},Game_System['prototype'][_0x17a7f4(0x380)]=function(){const _0x4c56da=_0x17a7f4;if(this[_0x4c56da(0x12e)]===undefined)this[_0x4c56da(0x25d)]();if(this[_0x4c56da(0x12e)][_0x4c56da(0x35b)]===undefined)this[_0x4c56da(0x25d)]();return this['_MessageCoreSettings'][_0x4c56da(0x35b)];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x304)]=function(_0x549264){const _0x4ec249=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x4ec249(0x12e)][_0x4ec249(0x35b)]===undefined)this['initMessageCore']();_0x549264=Math[_0x4ec249(0x357)](_0x549264);if(_0x549264%0x2!==0x0)_0x549264+=0x1;this['_MessageCoreSettings']['messageWidth']=_0x549264||0x2;},Game_System['prototype'][_0x17a7f4(0x323)]=function(){const _0x469264=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this[_0x469264(0x25d)]();if(this[_0x469264(0x12e)]['messageWordWrap']===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x469264(0x167)];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x126)]=function(_0x486ef2){const _0x53493d=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x53493d(0x167)]===undefined)this[_0x53493d(0x25d)]();this['_MessageCoreSettings'][_0x53493d(0x167)]=_0x486ef2;},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x363)]=function(){const _0x4b18de=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x4b18de(0x12e)]['helpWordWrap']===undefined)this[_0x4b18de(0x25d)]();return this[_0x4b18de(0x12e)]['helpWordWrap'];},Game_System['prototype']['setHelpWindowWordWrap']=function(_0x14e6b0){const _0x249cbf=_0x17a7f4;if(this[_0x249cbf(0x12e)]===undefined)this[_0x249cbf(0x25d)]();if(this[_0x249cbf(0x12e)][_0x249cbf(0x364)]===undefined)this[_0x249cbf(0x25d)]();this['_MessageCoreSettings'][_0x249cbf(0x364)]=_0x14e6b0;},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x311)]=function(){const _0x3d8cf3=_0x17a7f4;if(this[_0x3d8cf3(0x12e)]===undefined)this[_0x3d8cf3(0x25d)]();if(this[_0x3d8cf3(0x12e)][_0x3d8cf3(0x14a)]===undefined)this[_0x3d8cf3(0x25d)]();return this[_0x3d8cf3(0x12e)][_0x3d8cf3(0x14a)];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x18a)]=function(_0x4a5a60){const _0x40d384=_0x17a7f4;if(this[_0x40d384(0x12e)]===undefined)this[_0x40d384(0x25d)]();if(this[_0x40d384(0x12e)][_0x40d384(0x14a)]===undefined)this[_0x40d384(0x25d)]();this['_MessageCoreSettings'][_0x40d384(0x14a)]=_0x4a5a60||0x1;},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x1f1)]=function(){const _0x229e03=_0x17a7f4;if(this[_0x229e03(0x12e)]===undefined)this[_0x229e03(0x25d)]();if(this[_0x229e03(0x12e)][_0x229e03(0x233)]===undefined)this[_0x229e03(0x25d)]();return this[_0x229e03(0x12e)]['choiceRows'];},Game_System[_0x17a7f4(0x29f)]['setChoiceListMaxRows']=function(_0x10a7d1){const _0x1db821=_0x17a7f4;if(this[_0x1db821(0x12e)]===undefined)this[_0x1db821(0x25d)]();if(this[_0x1db821(0x12e)][_0x1db821(0x233)]===undefined)this[_0x1db821(0x25d)]();this[_0x1db821(0x12e)][_0x1db821(0x233)]=_0x10a7d1||0x1;},Game_System[_0x17a7f4(0x29f)]['getChoiceListMaxColumns']=function(){const _0x696ccc=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this[_0x696ccc(0x25d)]();if(this[_0x696ccc(0x12e)][_0x696ccc(0x310)]===undefined)this[_0x696ccc(0x25d)]();return this[_0x696ccc(0x12e)][_0x696ccc(0x310)];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x2b4)]=function(_0x155657){const _0x39219c=_0x17a7f4;if(this[_0x39219c(0x12e)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceCols']===undefined)this[_0x39219c(0x25d)]();this[_0x39219c(0x12e)][_0x39219c(0x310)]=_0x155657||0x1;},Game_System['prototype'][_0x17a7f4(0x28a)]=function(){const _0x106b61=_0x17a7f4;if(this['_MessageCoreSettings']===undefined)this[_0x106b61(0x25d)]();if(this[_0x106b61(0x12e)][_0x106b61(0x123)]===undefined)this[_0x106b61(0x25d)]();return this[_0x106b61(0x12e)]['choiceTextAlign'];},Game_System[_0x17a7f4(0x29f)][_0x17a7f4(0x1af)]=function(_0x53bdeb){const _0x507c10=_0x17a7f4;if(this[_0x507c10(0x12e)]===undefined)this[_0x507c10(0x25d)]();if(this[_0x507c10(0x12e)]['choiceTextAlign']===undefined)this[_0x507c10(0x25d)]();this[_0x507c10(0x12e)][_0x507c10(0x123)]=_0x53bdeb[_0x507c10(0x143)]();},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x14f)]=Game_Party[_0x17a7f4(0x29f)]['initialize'],Game_Party['prototype'][_0x17a7f4(0x2a3)]=function(){const _0xa72a4e=_0x17a7f4;VisuMZ[_0xa72a4e(0x1ff)][_0xa72a4e(0x14f)][_0xa72a4e(0x24f)](this),this[_0xa72a4e(0x25d)]();},Game_Party[_0x17a7f4(0x29f)][_0x17a7f4(0x25d)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x17a7f4(0x29f)][_0x17a7f4(0x2d9)]=function(){const _0x8fe214=_0x17a7f4;if(this[_0x8fe214(0x270)]===undefined)this[_0x8fe214(0x25d)]();return this[_0x8fe214(0x270)];},Game_Party['prototype'][_0x17a7f4(0x1f0)]=function(_0x372294,_0x45b00d){const _0x4b8a9f=_0x17a7f4;if(this['_lastGainedItemData']===undefined)this[_0x4b8a9f(0x25d)]();if(!_0x372294)return;if(DataManager[_0x4b8a9f(0x263)](_0x372294)){if('PmGjJ'!==_0x4b8a9f(0x21e))this[_0x4b8a9f(0x270)][_0x4b8a9f(0x180)]=0x0;else{function _0x289a88(){const _0x3d6704=_0x4b8a9f;if(this[_0x3d6704(0x12e)]===_0x593851)this[_0x3d6704(0x25d)]();if(this['_MessageCoreSettings'][_0x3d6704(0x14a)]===_0x5dd963)this['initMessageCore']();return this['_MessageCoreSettings']['choiceLineHeight'];}}}else{if(DataManager[_0x4b8a9f(0x2dd)](_0x372294)){if(_0x4b8a9f(0x1e9)===_0x4b8a9f(0x148)){function _0xed6469(){const _0xb5712e=_0x4b8a9f;_0xe788b6=this[_0xb5712e(0x1a5)](_0x5be412,_0x4ef0b5);}}else this[_0x4b8a9f(0x270)]['type']=0x1;}else{if(DataManager[_0x4b8a9f(0x255)](_0x372294)){if('EXQUV'!==_0x4b8a9f(0x279))this[_0x4b8a9f(0x270)]['type']=0x2;else{function _0x5682d0(){const _0x21fefd=_0x4b8a9f;_0x209883[_0x21fefd(0x1ff)]['Window_NameBox_updatePlacement'][_0x21fefd(0x24f)](this),this[_0x21fefd(0x1e7)](),this[_0x21fefd(0x13b)](),this['clampPlacementPosition'](),this[_0x21fefd(0x1f8)]();}}}}}this[_0x4b8a9f(0x270)]['id']=_0x372294['id'],this['_lastGainedItemData']['quantity']=_0x45b00d;},VisuMZ['MessageCore'][_0x17a7f4(0x338)]=Game_Party['prototype'][_0x17a7f4(0x256)],Game_Party[_0x17a7f4(0x29f)][_0x17a7f4(0x256)]=function(_0x18fc56,_0x560071,_0x3b46d8){const _0x41abe7=_0x17a7f4;VisuMZ['MessageCore'][_0x41abe7(0x338)][_0x41abe7(0x24f)](this,_0x18fc56,_0x560071,_0x3b46d8),_0x560071>0x0&&this[_0x41abe7(0x1f0)](_0x18fc56,_0x560071);},VisuMZ[_0x17a7f4(0x1ff)]['Game_Map_initialize']=Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x2a3)],Game_Map['prototype'][_0x17a7f4(0x2a3)]=function(){const _0x8937b7=_0x17a7f4;VisuMZ['MessageCore'][_0x8937b7(0x186)][_0x8937b7(0x24f)](this),this[_0x8937b7(0x2af)]=[];},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x37b)]=Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x276)],Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x276)]=function(){const _0x48da43=_0x17a7f4;VisuMZ[_0x48da43(0x1ff)][_0x48da43(0x37b)][_0x48da43(0x24f)](this),this[_0x48da43(0x2af)]=[];},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x346)]=Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x202)],Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x202)]=function(){const _0xbe4377=_0x17a7f4;VisuMZ[_0xbe4377(0x1ff)][_0xbe4377(0x346)][_0xbe4377(0x24f)](this),this[_0xbe4377(0x1a0)]();},Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x2e6)]=function(_0xffafb1){const _0x5b495d=_0x17a7f4;if(!$dataCommonEvents[_0xffafb1])return;this['_messageCommonEvents']=this[_0x5b495d(0x2af)]||[];const _0x58ff45=this[_0x5b495d(0x28e)]['_eventId'],_0x59d65f=new Game_MessageCommonEvent(_0xffafb1,_0x58ff45);this[_0x5b495d(0x2af)]['push'](_0x59d65f);},Game_Map[_0x17a7f4(0x29f)][_0x17a7f4(0x1a0)]=function(){const _0x54cfca=_0x17a7f4;this[_0x54cfca(0x2af)]=this['_messageCommonEvents']||[];for(const _0x48225f of this[_0x54cfca(0x2af)]){if(!_0x48225f[_0x54cfca(0x28e)])this['_messageCommonEvents'][_0x54cfca(0x242)](_0x48225f);else{if(_0x54cfca(0x1c7)!==_0x54cfca(0x213))_0x48225f[_0x54cfca(0x369)]();else{function _0x4ebf69(){const _0xaf28a7=_0x54cfca;this[_0xaf28a7(0x2a1)](_0x1c6911),_0x27c72f[_0xaf28a7(0x29f)][_0xaf28a7(0x315)]['call'](this,_0xdeb4a9);}}}}},Game_Interpreter['prototype']['command101']=function(_0x4129e5){const _0x5edc0e=_0x17a7f4;if($gameMessage['isBusy']())return![];return this['prepareShowTextCommand'](_0x4129e5),this[_0x5edc0e(0x14d)](_0x4129e5),this[_0x5edc0e(0x2fe)](_0x4129e5),this['setWaitMode']('message'),!![];},Game_Interpreter[_0x17a7f4(0x29f)]['prepareShowTextCommand']=function(_0x62d7ed){const _0x48a7a6=_0x17a7f4;$gameMessage[_0x48a7a6(0x25b)](_0x62d7ed[0x0],_0x62d7ed[0x1]),$gameMessage[_0x48a7a6(0x361)](_0x62d7ed[0x2]),$gameMessage[_0x48a7a6(0x29e)](_0x62d7ed[0x3]),$gameMessage[_0x48a7a6(0x207)](_0x62d7ed[0x4]);},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x14d)]=function(_0x4c49a4){const _0x2c35e3=_0x17a7f4;while(this['isContinuePrepareShowTextCommands']()){this['_index']++;this[_0x2c35e3(0x12a)]()[_0x2c35e3(0x1d3)]===0x191&&$gameMessage['add'](this[_0x2c35e3(0x12a)]()[_0x2c35e3(0x2a4)][0x0]);if(this[_0x2c35e3(0x1dc)]())break;}},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x1cc)]=function(){const _0x476705=_0x17a7f4;return this[_0x476705(0x2c4)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this[_0x476705(0x2c4)]()===0x191;},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x1dc)]=function(){const _0xe7f7c9=_0x17a7f4;return $gameMessage[_0xe7f7c9(0x2c9)][_0xe7f7c9(0x194)]>=$gameSystem[_0xe7f7c9(0x119)]()&&this[_0xe7f7c9(0x2c4)]()!==0x191;},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x2fe)]=function(_0x241b64){const _0xd6c16=_0x17a7f4;switch(this[_0xd6c16(0x2c4)]()){case 0x66:this[_0xd6c16(0x147)]++,this[_0xd6c16(0x32a)](this[_0xd6c16(0x12a)]()['parameters']);break;case 0x67:this['_index']++,this['setupNumInput'](this[_0xd6c16(0x12a)]()[_0xd6c16(0x2a4)]);break;case 0x68:this[_0xd6c16(0x147)]++,this[_0xd6c16(0x264)](this[_0xd6c16(0x12a)]()[_0xd6c16(0x2a4)]);break;}},VisuMZ['MessageCore'][_0x17a7f4(0x38c)]=Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x32a)],Game_Interpreter['prototype'][_0x17a7f4(0x32a)]=function(_0x1d1a58){const _0x17da1f=_0x17a7f4;_0x1d1a58=this[_0x17da1f(0x195)](),VisuMZ[_0x17da1f(0x1ff)]['Game_Interpreter_setupChoices'][_0x17da1f(0x24f)](this,_0x1d1a58);},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x195)]=function(){const _0x381dcc=_0x17a7f4,_0x4b9f70=this['_index'],_0xa9a663=[];let _0x233c59=0x0;this[_0x381dcc(0x147)]++;while(this[_0x381dcc(0x147)]<this[_0x381dcc(0x38a)]['length']){if(this[_0x381dcc(0x12a)]()['indent']===this[_0x381dcc(0x19e)]){if(this[_0x381dcc(0x12a)]()[_0x381dcc(0x1d3)]===0x194&&this[_0x381dcc(0x2c4)]()!==0x66){if(_0x381dcc(0x136)!==_0x381dcc(0x209))break;else{function _0x4c2960(){const _0x3a78fa=_0x381dcc;if(_0x4e762c[_0x3a78fa(0x360)]()){}else _0x3a8643[_0x3a78fa(0x2e6)](_0x4e8c4d);}}}else{if(this[_0x381dcc(0x12a)]()[_0x381dcc(0x1d3)]===0x66){if('UfQGb'===_0x381dcc(0x272)){function _0x56f187(){const _0x3fde2c=_0x381dcc,_0x3378dc=_0x4b8fda[_0x3fde2c(0x332)]('['+_0x1fc3ea['$1'][_0x3fde2c(0x193)](/\d+/g)+']');for(const _0x45323e of _0x3378dc){if(!_0x1dcf23['value'](_0x45323e))return![];}return!![];}}else this['adjustShowChoiceExtension'](_0x233c59,this[_0x381dcc(0x12a)](),_0x4b9f70),this[_0x381dcc(0x147)]-=0x2;}else{if(this[_0x381dcc(0x12a)]()[_0x381dcc(0x1d3)]===0x192){if(_0x381dcc(0x224)===_0x381dcc(0x225)){function _0x36dc54(){const _0x49f3e8=_0x381dcc,_0x376455=this['getConfigValue'](_0x1f14b7),_0x1e3852=0x1,_0x1a1299=_0x376455+(_0x4f4bad?_0x1e3852:-_0x1e3852);_0x1a1299>0xb&&_0x1dc54c?this[_0x49f3e8(0x324)](_0x5188de,0x1):this[_0x49f3e8(0x324)](_0x84e381,_0x1a1299[_0x49f3e8(0x287)](0x1,0xb));}}else this['currentCommand']()[_0x381dcc(0x2a4)][0x0]=_0x233c59,_0x233c59++;}}}}this[_0x381dcc(0x147)]++;}return this[_0x381dcc(0x147)]=_0x4b9f70,this['currentCommand']()[_0x381dcc(0x2a4)];},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x245)]=function(_0x17efb3,_0x3f0cb7,_0x162c9d){const _0x52d578=_0x17a7f4;this[_0x52d578(0x1d5)](_0x17efb3,_0x3f0cb7,_0x162c9d),this[_0x52d578(0x22a)](_0x17efb3,_0x3f0cb7,_0x162c9d),this[_0x52d578(0x129)](_0x3f0cb7,_0x162c9d);},Game_Interpreter['prototype'][_0x17a7f4(0x1d5)]=function(_0x5333fc,_0x17885f,_0x1f75ce){const _0x321431=_0x17a7f4;if(_0x17885f['parameters'][0x2]<0x0)return;const _0x1ceb24=_0x17885f[_0x321431(0x2a4)][0x2]+_0x5333fc;this['_list'][_0x1f75ce][_0x321431(0x2a4)][0x2]=_0x1ceb24;},Game_Interpreter['prototype'][_0x17a7f4(0x22a)]=function(_0x1f247f,_0x1dba97,_0x1d7dd9){const _0x3de8db=_0x17a7f4;if(_0x1dba97[_0x3de8db(0x2a4)][0x1]>=0x0){var _0x573ab0=_0x1dba97['parameters'][0x1]+_0x1f247f;this[_0x3de8db(0x38a)][_0x1d7dd9][_0x3de8db(0x2a4)][0x1]=_0x573ab0;}else{if(_0x1dba97[_0x3de8db(0x2a4)][0x1]===-0x2){if('tSVGN'==='XMOud'){function _0x1900db(){const _0x1e5be3=_0x3de8db;this[_0x1e5be3(0x390)](_0x47b193);}}else this[_0x3de8db(0x38a)][_0x1d7dd9][_0x3de8db(0x2a4)][0x1]=_0x1dba97[_0x3de8db(0x2a4)][0x1];}}},Game_Interpreter[_0x17a7f4(0x29f)][_0x17a7f4(0x129)]=function(_0x25444c,_0x4904ae){const _0x5a285c=_0x17a7f4;for(const _0x6cb30e of _0x25444c['parameters'][0x0]){this['_list'][_0x4904ae][_0x5a285c(0x2a4)][0x0][_0x5a285c(0x176)](_0x6cb30e);}this['_list'][_0x5a285c(0x212)](this[_0x5a285c(0x147)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x1f8591=_0x17a7f4;this[_0x1f8591(0x2a3)](...arguments);}Game_MessageCommonEvent[_0x17a7f4(0x29f)][_0x17a7f4(0x2a3)]=function(_0x2cb2c4,_0x4c302a){const _0x58e36c=_0x17a7f4;this[_0x58e36c(0x26f)]=_0x2cb2c4,this[_0x58e36c(0x26b)]=_0x4c302a||0x0,this[_0x58e36c(0x28d)]();},Game_MessageCommonEvent[_0x17a7f4(0x29f)][_0x17a7f4(0x146)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x17a7f4(0x29f)][_0x17a7f4(0x163)]=function(){const _0x421afc=_0x17a7f4;return this[_0x421afc(0x146)]()[_0x421afc(0x163)];},Game_MessageCommonEvent[_0x17a7f4(0x29f)]['refresh']=function(){const _0x84d38b=_0x17a7f4;this[_0x84d38b(0x28e)]=new Game_Interpreter(),this[_0x84d38b(0x28e)][_0x84d38b(0x13f)](this[_0x84d38b(0x163)](),this[_0x84d38b(0x26b)]);},Game_MessageCommonEvent['prototype'][_0x17a7f4(0x369)]=function(){const _0x3cdaed=_0x17a7f4;if(this[_0x3cdaed(0x28e)]){if(_0x3cdaed(0x29b)!==_0x3cdaed(0x11a))this[_0x3cdaed(0x28e)][_0x3cdaed(0x222)]()?this[_0x3cdaed(0x28e)][_0x3cdaed(0x369)]():this[_0x3cdaed(0x19f)]();else{function _0x4e37f7(){const _0x37c140=_0x3cdaed;this[_0x37c140(0x270)]['type']=0x2;}}}},Game_MessageCommonEvent['prototype']['clear']=function(){const _0x49194e=_0x17a7f4;this[_0x49194e(0x28e)]=null;},Scene_Message[_0x17a7f4(0x29f)]['messageWindowRect']=function(){const _0x18d91b=_0x17a7f4,_0x5d8cfd=Math[_0x18d91b(0x15c)](Graphics[_0x18d91b(0x2d2)],$gameSystem['getMessageWindowWidth']()),_0x45b858=$gameSystem['getMessageWindowRows'](),_0x1494b6=this[_0x18d91b(0x13a)](_0x45b858,![]),_0x327ba4=(Graphics[_0x18d91b(0x26e)]-_0x5d8cfd)/0x2,_0x1c6679=0x0;return new Rectangle(_0x327ba4,_0x1c6679,_0x5d8cfd,_0x1494b6);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x2ec)]=Scene_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x2a9)],Scene_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x2a9)]=function(){const _0x5a7b09=_0x17a7f4;let _0x71b8af=VisuMZ[_0x5a7b09(0x1ff)][_0x5a7b09(0x2ec)][_0x5a7b09(0x24f)](this);const _0x473526=VisuMZ[_0x5a7b09(0x1ff)][_0x5a7b09(0x34e)];if(_0x473526['TextSpeed']['AddOption']&&_0x473526['TextSpeed'][_0x5a7b09(0x20f)])_0x71b8af++;return _0x71b8af;},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x170)]=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x2a3)],Window_Base[_0x17a7f4(0x29f)]['initialize']=function(_0x414b88){const _0x1e6f04=_0x17a7f4;this[_0x1e6f04(0x25d)](_0x414b88),VisuMZ[_0x1e6f04(0x1ff)]['Window_Base_initialize'][_0x1e6f04(0x24f)](this,_0x414b88);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x25d)]=function(_0x1689b5){const _0x305db8=_0x17a7f4;this[_0x305db8(0x313)](),this[_0x305db8(0x16d)](),this['registerResetRect'](_0x1689b5);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x313)]=function(){const _0x4b87dc=_0x17a7f4;this[_0x4b87dc(0x1ae)](_0x4b87dc(0x2f0));},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1ae)]=function(_0x23bb72){const _0x3652b3=_0x17a7f4;this[_0x3652b3(0x28f)]=_0x23bb72;},Window_Base[_0x17a7f4(0x29f)]['getTextAlignment']=function(){return this['_textAlignment'];},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x22f)]=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x284)],Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x284)]=function(_0x530c94){const _0x3bcce5=_0x17a7f4;return this[_0x3bcce5(0x16d)](),VisuMZ[_0x3bcce5(0x1ff)][_0x3bcce5(0x22f)]['call'](this,_0x530c94);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x15b)]=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x152)],Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x152)]=function(_0x10bac5){const _0x5d0cbf=_0x17a7f4;VisuMZ['MessageCore']['Window_Base_processAllText'][_0x5d0cbf(0x24f)](this,_0x10bac5);if(_0x10bac5[_0x5d0cbf(0x2eb)])this['setTextAlignment']('default');},Window_Base[_0x17a7f4(0x29f)]['resetWordWrap']=function(){this['setWordWrap'](![]);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1c2)]=function(){const _0x5e1dbe=_0x17a7f4;return this[_0x5e1dbe(0x19d)];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x11c)]=function(_0x13b97c){const _0x3ed10e=_0x17a7f4;return this[_0x3ed10e(0x19d)]=_0x13b97c,'';},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x367)]=function(_0x3a3695){const _0x1c0c7f=_0x17a7f4;this[_0x1c0c7f(0x187)]=JsonEx[_0x1c0c7f(0x298)](_0x3a3695);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x113)]=function(){const _0x1c3f82=_0x17a7f4;this['contents'][_0x1c3f82(0x344)]=$gameSystem['mainFontFace'](),this['contents'][_0x1c3f82(0x23e)]=$gameSystem[_0x1c3f82(0x2d0)](),this['contents']['fontBold']=![],this['contents'][_0x1c3f82(0x269)]=![],this[_0x1c3f82(0x2b7)]();},Window_Base['prototype']['resetTextColor']=function(){const _0x2730f1=_0x17a7f4;this['changeTextColor'](ColorManager['normalColor']()),this[_0x2730f1(0x159)](ColorManager[_0x2730f1(0x173)]());const _0x4d2f4d=VisuMZ['MessageCore'][_0x2730f1(0x34e)][_0x2730f1(0x2ed)];_0x4d2f4d[_0x2730f1(0x169)]===undefined&&(_0x4d2f4d[_0x2730f1(0x169)]=0x3),this['contents'][_0x2730f1(0x234)]=_0x4d2f4d[_0x2730f1(0x169)],this[_0x2730f1(0x30a)](![]);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x30a)]=function(_0xf9dc86){const _0x32fd37=_0x17a7f4;this[_0x32fd37(0x2e8)]=_0xf9dc86;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x31f)]=function(){const _0x33079b=_0x17a7f4;return this[_0x33079b(0x2e8)];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x120)]=function(){return![];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x30f)]=function(){const _0x42f927=_0x17a7f4,_0x21c5dd=[_0x42f927(0x344),'fontSize',_0x42f927(0x22c),'fontItalic',_0x42f927(0x132),_0x42f927(0x265),_0x42f927(0x234),_0x42f927(0x1fd)];let _0x1c4172={};for(const _0x53e2a4 of _0x21c5dd){_0x1c4172[_0x53e2a4]=this['contents'][_0x53e2a4];}return _0x1c4172;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x309)]=function(_0x1ad3b7){const _0x52b2c6=_0x17a7f4;for(const _0x55f894 in _0x1ad3b7){if(_0x52b2c6(0x2dc)!==_0x52b2c6(0x2dc)){function _0x4d6c59(){const _0xc8bcec=_0x52b2c6;return this[_0xc8bcec(0x1c0)](_0x2f5aae,!![],!![]),this[_0xc8bcec(0x12d)](_0xc8bcec(0x2ce),_0x5353ff(_0x31d1e7)||0x0),'';}}else this[_0x52b2c6(0x2fb)][_0x55f894]=_0x1ad3b7[_0x55f894];}},VisuMZ[_0x17a7f4(0x1ff)]['Window_Base_update']=Window_Base[_0x17a7f4(0x29f)]['update'],Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x369)]=function(){const _0x5d6d14=_0x17a7f4;VisuMZ[_0x5d6d14(0x1ff)][_0x5d6d14(0x1ef)][_0x5d6d14(0x24f)](this),this[_0x5d6d14(0x305)]();},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x14c)]=function(){return![];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x305)]=function(){const _0x1cdb00=_0x17a7f4;if(this[_0x1cdb00(0x299)]>0x0){if(_0x1cdb00(0x12b)===_0x1cdb00(0x12b)){if(this['canMove']()){if(_0x1cdb00(0x27e)===_0x1cdb00(0x254)){function _0x3717e2(){const _0x28665c=_0x1cdb00;_0x2320a9=_0x1bae4b[_0x28665c(0x36d)](_0x103651[_0x28665c(0x2ae)],''),_0x1acd5a=_0x2b0485[_0x28665c(0x36d)](_0x1bee1d['_autoPosRegExp'],''),this['_autoSizeCheck']=!![];const _0x567203=this[_0x28665c(0x284)](_0x23cbc1);if(_0x5d2bb5){let _0x52d166=_0x567203['width']+_0x2c2862[_0x28665c(0x378)]()*0x2+0x6;const _0x5efe65=_0x3715e9[_0x28665c(0x36f)]()!=='',_0x522004=_0x24f0f0['faceWidth'],_0x53258c=0x14;_0x52d166+=_0x5efe65?_0x522004+_0x53258c:0x4;if(_0x52d166%0x2!==0x0)_0x52d166+=0x1;_0x558a3e[_0x28665c(0x304)](_0x52d166);}if(_0x2fabe0){let _0x32625a=_0x28f593[_0x28665c(0x357)](_0x567203[_0x28665c(0x1d9)]/this['lineHeight']());_0x2a46f0['setMessageWindowRows'](_0x32625a);}this[_0x28665c(0x2f3)](),this['_autoSizeCheck']=![],this['_messagePositionReset']=!![];}}else this['x']=this[_0x1cdb00(0x1fc)](this['x'],this[_0x1cdb00(0x25a)]),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this[_0x1cdb00(0x2d2)]=this['applyMoveEasing'](this[_0x1cdb00(0x2d2)],this[_0x1cdb00(0x138)]),this[_0x1cdb00(0x1d9)]=this[_0x1cdb00(0x1fc)](this[_0x1cdb00(0x1d9)],this['_moveTargetHeight']),this[_0x1cdb00(0x30c)]();}this[_0x1cdb00(0x299)]--;}else{function _0x48fa00(){const _0x45bae2=_0x1cdb00;_0x11ed07[_0x45bae2(0x1ff)][_0x45bae2(0x20d)]('TextCodeActions');for(const _0xcd9328 of _0x14cdf1[_0x45bae2(0x1ff)][_0x45bae2(0x34e)][_0x45bae2(0x358)]){_0xcd9328[_0x45bae2(0x20b)]=_0xcd9328[_0x45bae2(0x20b)][_0x45bae2(0x253)](),_0xcd9328[_0x45bae2(0x388)]=new _0x5cb971('\x1b'+_0xcd9328[_0x45bae2(0x20b)],'gi'),_0xcd9328[_0x45bae2(0x198)]='\x1b'+_0xcd9328['Match'];if(_0xcd9328['Type']==='')_0xcd9328[_0x45bae2(0x198)]+=_0x45bae2(0x156);}}}}},Window_Base[_0x17a7f4(0x29f)]['clampPlacementPosition']=function(_0xd6afe0,_0x58f312){const _0x463f56=_0x17a7f4;!_0xd6afe0&&(this[_0x463f56(0x2d2)]=Math[_0x463f56(0x15c)](this[_0x463f56(0x2d2)],Graphics[_0x463f56(0x2d2)]),this[_0x463f56(0x1d9)]=Math[_0x463f56(0x15c)](this['height'],Graphics['height']));if(!_0x58f312){const _0x5ba85e=-(Math[_0x463f56(0x31d)](Graphics[_0x463f56(0x2d2)]-Graphics[_0x463f56(0x26e)])/0x2),_0x1e9761=_0x5ba85e+Graphics[_0x463f56(0x2d2)]-this[_0x463f56(0x2d2)],_0x514ac5=-(Math[_0x463f56(0x31d)](Graphics[_0x463f56(0x1d9)]-Graphics[_0x463f56(0x383)])/0x2),_0x3571a4=_0x514ac5+Graphics[_0x463f56(0x1d9)]-this['height'];this['x']=this['x'][_0x463f56(0x287)](_0x5ba85e,_0x1e9761),this['y']=this['y']['clamp'](_0x514ac5,_0x3571a4);}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1fc)]=function(_0xd8745a,_0x5531cb){const _0x436b4c=_0x17a7f4,_0x4e1247=this[_0x436b4c(0x299)],_0x15f006=this[_0x436b4c(0x34c)],_0x250d85=this[_0x436b4c(0x351)]((_0x15f006-_0x4e1247)/_0x15f006),_0xac2154=this[_0x436b4c(0x351)]((_0x15f006-_0x4e1247+0x1)/_0x15f006),_0x2220a0=(_0xd8745a-_0x5531cb*_0x250d85)/(0x1-_0x250d85);return _0x2220a0+(_0x5531cb-_0x2220a0)*_0xac2154;},Window_Base['prototype']['calcMoveEasing']=function(_0xf48ae){const _0x4341f5=_0x17a7f4,_0xf3cb73=0x2;switch(this[_0x4341f5(0x1c6)]){case 0x0:return _0xf48ae;case 0x1:return this['easeIn'](_0xf48ae,_0xf3cb73);case 0x2:return this['easeOut'](_0xf48ae,_0xf3cb73);case 0x3:return this[_0x4341f5(0x300)](_0xf48ae,_0xf3cb73);default:if(Imported[_0x4341f5(0x236)])return VisuMZ[_0x4341f5(0x1fc)](_0xf48ae,this['_moveEasingType']);else{if(_0x4341f5(0x2ef)!==_0x4341f5(0x1a8))return _0xf48ae;else{function _0x57897f(){const _0x58bd9b=_0x4341f5;this[_0x58bd9b(0x34d)](),_0x579b66[_0x58bd9b(0x1ff)]['Window_Help_refresh'][_0x58bd9b(0x24f)](this),this[_0x58bd9b(0x16d)]();}}}}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x2c7)]=function(_0x23d0c4,_0x40fd45,_0x50e475,_0x46fae6,_0x304067,_0x15e5cd){const _0x52cfde=_0x17a7f4;this[_0x52cfde(0x25a)]=_0x23d0c4,this[_0x52cfde(0x2e3)]=_0x40fd45,this[_0x52cfde(0x138)]=_0x50e475||this[_0x52cfde(0x2d2)],this['_moveTargetHeight']=_0x46fae6||this['height'],this[_0x52cfde(0x299)]=_0x304067||0x1;if(this[_0x52cfde(0x299)]<=0x0)this[_0x52cfde(0x299)]=0x1;this[_0x52cfde(0x34c)]=this[_0x52cfde(0x299)],this['_moveEasingType']=_0x15e5cd||0x0;if(_0x304067<=0x0)this[_0x52cfde(0x305)]();},Window_Base['prototype'][_0x17a7f4(0x11f)]=function(_0x5b3320,_0x464748,_0x342a9b,_0x211d84,_0x3600cc,_0x11fb49){const _0x31d421=_0x17a7f4;this['_moveTargetX']=this['x']+_0x5b3320,this['_moveTargetY']=this['y']+_0x464748,this['_moveTargetWidth']=this[_0x31d421(0x2d2)]+(_0x342a9b||0x0),this[_0x31d421(0x137)]=this[_0x31d421(0x1d9)]+(_0x211d84||0x0),this[_0x31d421(0x299)]=_0x3600cc||0x1;if(this['_moveDuration']<=0x0)this[_0x31d421(0x299)]=0x1;this[_0x31d421(0x34c)]=this[_0x31d421(0x299)],this[_0x31d421(0x1c6)]=_0x11fb49||0x0;if(_0x3600cc<=0x0)this[_0x31d421(0x305)]();},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1c9)]=function(_0x17977f,_0x114eea){const _0x523009=_0x17a7f4;this[_0x523009(0x2c7)](this[_0x523009(0x187)]['x'],this[_0x523009(0x187)]['y'],this['_resetRect'][_0x523009(0x2d2)],this[_0x523009(0x187)][_0x523009(0x1d9)],_0x17977f,_0x114eea);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x319)]=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x232)],Window_Base[_0x17a7f4(0x29f)]['changeTextColor']=function(_0x3c8b33){const _0x210b1a=_0x17a7f4;if(this['isColorLocked']())return;_0x3c8b33=_0x3c8b33[_0x210b1a(0x36d)](/\,/g,''),this[_0x210b1a(0x391)]=this[_0x210b1a(0x391)]||[],this[_0x210b1a(0x391)]['unshift'](this[_0x210b1a(0x2fb)][_0x210b1a(0x132)]),VisuMZ['MessageCore'][_0x210b1a(0x319)]['call'](this,_0x3c8b33);},Window_Base['prototype']['processPreviousColor']=function(_0x3270c9){const _0x4a1892=_0x17a7f4;this[_0x4a1892(0x390)](_0x3270c9);if(this[_0x4a1892(0x31f)]())return;_0x3270c9[_0x4a1892(0x2eb)]&&(this[_0x4a1892(0x391)]=this[_0x4a1892(0x391)]||[],this[_0x4a1892(0x2fb)]['textColor']=this[_0x4a1892(0x391)][_0x4a1892(0x1fb)]()||ColorManager['normalColor']());},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x32c)]=function(_0x1f1806){const _0x3ba2dc=_0x17a7f4;return _0x1f1806=this[_0x3ba2dc(0x127)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x37a)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x341)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x149)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x17d)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x339)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x275)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x1e8)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x217)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x2fa)](_0x1f1806),_0x1f1806=this['convertMessageCoreEscapeReplacements'](_0x1f1806),_0x1f1806=this['postConvertEscapeCharacters'](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x341)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x20e)](_0x1f1806),_0x1f1806=this[_0x3ba2dc(0x13e)](_0x1f1806),_0x1f1806;},Window_Base[_0x17a7f4(0x29f)]['convertTextMacros']=function(_0x3361df){const _0x22a0bd=_0x17a7f4;for(const _0x4a6423 of VisuMZ['MessageCore'][_0x22a0bd(0x34e)]['TextMacros']){_0x3361df[_0x22a0bd(0x193)](_0x4a6423[_0x22a0bd(0x388)])&&(_0x3361df=_0x3361df[_0x22a0bd(0x36d)](_0x4a6423[_0x22a0bd(0x388)],_0x4a6423['textCodeResult']['bind'](this)));}return _0x3361df;},Window_Base[_0x17a7f4(0x29f)]['convertBackslashCharacters']=function(_0x132fc9){const _0x8876f2=_0x17a7f4;return _0x132fc9=_0x132fc9[_0x8876f2(0x36d)](/\\/g,'\x1b'),_0x132fc9=_0x132fc9['replace'](/\x1b\x1b/g,'\x5c'),_0x132fc9;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x341)]=function(_0x13935a){const _0xfba10=_0x17a7f4;for(;;){if(_0x13935a[_0xfba10(0x193)](/\\V\[(\d+)\]/gi)){if(_0xfba10(0x200)===_0xfba10(0x200))_0x13935a=_0x13935a[_0xfba10(0x36d)](/\\V\[(\d+)\]/gi,(_0x333cda,_0x3532c7)=>this['convertBackslashCharacters'](String($gameVariables[_0xfba10(0x2e2)](parseInt(_0x3532c7)))));else{function _0xd5a6c7(){const _0x4e049a=_0xfba10,_0x56d6a7=_0x9531e4['getLastGainedItemData']();if(_0x56d6a7['id']<0x0)return'';let _0x11a8f5=null;if(_0x56d6a7[_0x4e049a(0x180)]===0x0)_0x11a8f5=_0xffd818[_0x56d6a7['id']];if(_0x56d6a7[_0x4e049a(0x180)]===0x1)_0x11a8f5=_0x307c43[_0x56d6a7['id']];if(_0x56d6a7[_0x4e049a(0x180)]===0x2)_0x11a8f5=_0x17eb48[_0x56d6a7['id']];if(!_0x11a8f5)return'';return _0x2eb565?'\x1bi[%1]%2'[_0x4e049a(0x27c)](_0x11a8f5[_0x4e049a(0x267)],_0x11a8f5[_0x4e049a(0x1a4)]):_0x11a8f5['name'];}}}else{if(_0x13935a[_0xfba10(0x193)](/\x1bV\[(\d+)\]/gi))_0x13935a=_0x13935a[_0xfba10(0x36d)](/\x1bV\[(\d+)\]/gi,(_0x4a1c4c,_0x1e30b1)=>this[_0xfba10(0x37a)](String($gameVariables[_0xfba10(0x2e2)](parseInt(_0x1e30b1)))));else break;}}return _0x13935a;},Window_Base[_0x17a7f4(0x29f)]['preConvertEscapeCharacters']=function(_0x20204e){const _0x104450=_0x17a7f4;return this[_0x104450(0x221)](),_0x20204e;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1d2)]=function(_0x573438){return _0x573438;},Window_Base[_0x17a7f4(0x29f)]['convertShowChoiceEscapeCodes']=function(_0x522cf5){const _0xa3a28b=_0x17a7f4;return _0x522cf5=_0x522cf5[_0xa3a28b(0x36d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x522cf5=_0x522cf5['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x522cf5=_0x522cf5[_0xa3a28b(0x36d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x522cf5;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x339)]=function(_0x3db595){const _0x22c3b0=_0x17a7f4;return _0x3db595=_0x3db595['replace'](/<B>/gi,_0x22c3b0(0x347)),_0x3db595=_0x3db595[_0x22c3b0(0x36d)](/<\/B>/gi,_0x22c3b0(0x384)),_0x3db595=_0x3db595[_0x22c3b0(0x36d)](/<I>/gi,_0x22c3b0(0x2cc)),_0x3db595=_0x3db595['replace'](/<\/I>/gi,_0x22c3b0(0x1de)),_0x3db595;},Window_Base[_0x17a7f4(0x29f)]['convertTextAlignmentEscapeCharacters']=function(_0x441657){const _0xf82330=_0x17a7f4;return _0x441657=_0x441657['replace'](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x441657=_0x441657['replace'](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x441657=_0x441657['replace'](/<CENTER>/gi,_0xf82330(0x370)),_0x441657=_0x441657['replace'](/<\/CENTER>/gi,_0xf82330(0x289)),_0x441657=_0x441657[_0xf82330(0x36d)](/<RIGHT>/gi,_0xf82330(0x2c3)),_0x441657=_0x441657[_0xf82330(0x36d)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x441657;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1e8)]=function(_0x361597){const _0x482b7c=_0x17a7f4;return _0x361597=_0x361597['replace'](/<COLORLOCK>/gi,_0x482b7c(0x21c)),_0x361597=_0x361597[_0x482b7c(0x36d)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x361597=_0x361597[_0x482b7c(0x36d)](/\(\(\(/gi,_0x482b7c(0x21c)),_0x361597=_0x361597[_0x482b7c(0x36d)](/\)\)\)/gi,_0x482b7c(0x25e)),_0x361597;},Window_Base[_0x17a7f4(0x29f)]['convertBaseEscapeCharacters']=function(_0x5e4026){const _0x2171eb=_0x17a7f4;return _0x5e4026=_0x5e4026['replace'](/\x1bN\[(\d+)\]/gi,(_0x1c8a23,_0x57e9be)=>this[_0x2171eb(0x1b2)](parseInt(_0x57e9be))),_0x5e4026=_0x5e4026[_0x2171eb(0x36d)](/\x1bP\[(\d+)\]/gi,(_0x13642f,_0x553eb6)=>this[_0x2171eb(0x21b)](parseInt(_0x553eb6))),_0x5e4026=_0x5e4026[_0x2171eb(0x36d)](/\x1bG/gi,TextManager[_0x2171eb(0x2d7)]),_0x5e4026;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x2fa)]=function(_0x813ed3){const _0x549c4a=_0x17a7f4;for(const _0x516f0b of VisuMZ[_0x549c4a(0x1ff)]['Settings'][_0x549c4a(0x358)]){if(_0x549c4a(0x337)!==_0x549c4a(0x337)){function _0x57b6db(){const _0x3bc24f=_0x549c4a;if(this['_MessageCoreSettings']===_0x1172e5)this[_0x3bc24f(0x25d)]();if(this[_0x3bc24f(0x12e)][_0x3bc24f(0x310)]===_0x20561e)this[_0x3bc24f(0x25d)]();this[_0x3bc24f(0x12e)]['choiceCols']=_0x20b363||0x1;}}else _0x813ed3['match'](_0x516f0b[_0x549c4a(0x388)])&&(_0x813ed3=_0x813ed3[_0x549c4a(0x36d)](_0x516f0b['textCodeCheck'],_0x516f0b[_0x549c4a(0x198)]),_0x813ed3=this[_0x549c4a(0x341)](_0x813ed3));}return _0x813ed3;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1b1)]=function(_0x24691a){const _0xfb865e=_0x17a7f4;for(const _0x1f6405 of VisuMZ[_0xfb865e(0x1ff)]['Settings'][_0xfb865e(0x2d1)]){if(_0x24691a[_0xfb865e(0x193)](_0x1f6405['textCodeCheck'])){if(_0xfb865e(0x285)!==_0xfb865e(0x16f))_0x24691a=_0x24691a[_0xfb865e(0x36d)](_0x1f6405[_0xfb865e(0x388)],_0x1f6405[_0xfb865e(0x198)]['bind'](this)),_0x24691a=this['convertVariableEscapeCharacters'](_0x24691a);else{function _0x336991(){return _0x3f5fce;}}}}return _0x24691a;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1b2)]=function(_0x19ce4b){const _0x5f40b=_0x17a7f4,_0x3d1bd9=_0x19ce4b>=0x1?$gameActors['actor'](_0x19ce4b):null,_0x4d5e7e=_0x3d1bd9?_0x3d1bd9['name']():'',_0x3efacf=Number(VisuMZ[_0x5f40b(0x1ff)][_0x5f40b(0x34e)]['AutoColor'][_0x5f40b(0x24e)]);if(this[_0x5f40b(0x120)]()&&_0x3efacf!==0x0)return _0x5f40b(0x178)[_0x5f40b(0x27c)](_0x3efacf,_0x4d5e7e);else{if(_0x5f40b(0x249)===_0x5f40b(0x2ea)){function _0x5d47ae(){const _0x1bdcad=_0x5f40b;_0x284c48[_0x1bdcad(0x1ff)][_0x1bdcad(0x334)][_0x1bdcad(0x24f)](this),this[_0x1bdcad(0x25d)]();}}else return _0x4d5e7e;}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x21b)]=function(_0x52bd1b){const _0x405ea3=_0x17a7f4,_0xaee58=_0x52bd1b>=0x1?$gameParty[_0x405ea3(0x203)]()[_0x52bd1b-0x1]:null,_0x2eaa94=_0xaee58?_0xaee58[_0x405ea3(0x1a4)]():'',_0x52e4cf=Number(VisuMZ['MessageCore']['Settings'][_0x405ea3(0x33f)][_0x405ea3(0x24e)]);if(this['isAutoColorAffected']()&&_0x52e4cf!==0x0){if('jYkvu'===_0x405ea3(0x331))return _0x405ea3(0x178)[_0x405ea3(0x27c)](_0x52e4cf,_0x2eaa94);else{function _0x52e882(){const _0x34a8c1=_0x405ea3,_0x536017=_0x57473c(_0x461be5['$1']);_0x536017<_0x4b7930?(_0x4eff71(_0x34a8c1(0x153)[_0x34a8c1(0x27c)](_0xecacfb,_0x536017,_0x488ff6)),_0xf15ef8[_0x34a8c1(0x2b0)]()):_0x46678d=_0x45a60d[_0x34a8c1(0x368)](_0x536017,_0xa19b5b);}}}else return _0x2eaa94;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x20e)]=function(_0xbb48f8){const _0x581cd1=_0x17a7f4;if(this[_0x581cd1(0x120)]()){if('oKNsj'!==_0x581cd1(0x1cb)){function _0x40923e(){const _0x3b24c4=_0x581cd1,_0xd444e=_0x4eedbb(_0x33ef0a['$1']);_0xd444e!==_0x1a86f5[_0x5971cb][_0x3b24c4(0x1a2)]&&(_0x14e98e('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x5bf22a,_0xd444e)),_0x568b5a[_0x3b24c4(0x2b0)]());}}else _0xbb48f8=this[_0x581cd1(0x2a5)](_0xbb48f8),_0xbb48f8=this[_0x581cd1(0x157)](_0xbb48f8);}return _0xbb48f8;},Window_Base['prototype'][_0x17a7f4(0x2a5)]=function(_0x245654){const _0x41f836=_0x17a7f4;for(autoColor of VisuMZ[_0x41f836(0x1ff)]['AutoColorRegExp']){_0x245654=_0x245654[_0x41f836(0x36d)](autoColor[0x0],autoColor[0x1]);}return _0x245654;},Window_Base[_0x17a7f4(0x29f)]['clearActorNameAutoColor']=function(){const _0x25d45c=_0x17a7f4;this[_0x25d45c(0x229)]=[];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x221)]=function(){const _0x12cfdd=_0x17a7f4;this[_0x12cfdd(0x34d)]();const _0x4ea744=VisuMZ[_0x12cfdd(0x1ff)][_0x12cfdd(0x34e)]['AutoColor'],_0x23bb44=_0x4ea744[_0x12cfdd(0x24e)];if(_0x23bb44<=0x0)return;for(const _0x488fc2 of $gameActors['_data']){if('QkhTw'===_0x12cfdd(0x2c5)){if(!_0x488fc2)continue;const _0x55c7d3=_0x488fc2[_0x12cfdd(0x1a4)]();if(_0x55c7d3[_0x12cfdd(0x1d6)]()[_0x12cfdd(0x194)]<=0x0)continue;if(/^\d+$/[_0x12cfdd(0x1e3)](_0x55c7d3))continue;if(_0x55c7d3[_0x12cfdd(0x193)](/-----/i))continue;let _0xdf3a1=VisuMZ[_0x12cfdd(0x1ff)][_0x12cfdd(0x18b)](_0x55c7d3);const _0x1f2d94=new RegExp('\x5cb'+_0xdf3a1+'\x5cb','g'),_0x28a243=_0x12cfdd(0x178)[_0x12cfdd(0x27c)](_0x23bb44,_0x55c7d3);this[_0x12cfdd(0x229)][_0x12cfdd(0x176)]([_0x1f2d94,_0x28a243]);}else{function _0x51ff30(){const _0x5c5b18=_0x12cfdd;this[_0x5c5b18(0x2bf)]=_0x3b92a9[_0x5c5b18(0x1ff)][_0x5c5b18(0x34e)]['TextSpeed'][_0x5c5b18(0x192)];}}}},Window_Base[_0x17a7f4(0x29f)]['processActorNameAutoColorChanges']=function(_0x16ab44){const _0x80afae=_0x17a7f4;this[_0x80afae(0x229)]===undefined&&this[_0x80afae(0x221)]();for(autoColor of this[_0x80afae(0x229)]){_0x16ab44=_0x16ab44[_0x80afae(0x36d)](autoColor[0x0],autoColor[0x1]);}return _0x16ab44;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x327)]=function(_0x1c8c57,_0x2ebdaf,_0x3bb166){const _0x15bbbc=_0x17a7f4;if(!_0x1c8c57)return'';const _0x20ae82=_0x1c8c57[_0x2ebdaf];let _0x3899fd='';if(_0x20ae82&&_0x3bb166&&_0x20ae82[_0x15bbbc(0x267)]){if(_0x15bbbc(0x1fa)!==_0x15bbbc(0x1fa)){function _0x34eb9c(){const _0x4331d0=_0x15bbbc;return this[_0x4331d0(0x390)](_0x11c30d);}}else{const _0xd97283=_0x15bbbc(0x365);_0x3899fd=_0xd97283[_0x15bbbc(0x27c)](_0x20ae82[_0x15bbbc(0x267)],_0x20ae82[_0x15bbbc(0x1a4)]);}}else _0x20ae82?_0x3899fd=_0x20ae82[_0x15bbbc(0x1a4)]:_0x3899fd='';if(this[_0x15bbbc(0x120)]()){if(_0x15bbbc(0x150)===_0x15bbbc(0x150))_0x3899fd=this[_0x15bbbc(0x1a5)](_0x3899fd,_0x1c8c57);else{function _0x50ce90(){const _0x2de724=_0x15bbbc,_0x1675c9=_0x135ac7[_0x2de724(0x332)]('['+_0x138959['$1'][_0x2de724(0x193)](/\d+/g)+']');for(const _0x103fcb of _0x1675c9){if(!_0x148841[_0x2de724(0x2e2)](_0x103fcb))return!![];}return![];}}}return _0x3899fd;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x317)]=function(_0x3e87e9){const _0x1dd192=_0x17a7f4,_0x3d9d4e=$gameParty[_0x1dd192(0x2d9)]();if(_0x3d9d4e['id']<0x0)return'';let _0x47a247=null;if(_0x3d9d4e['type']===0x0)_0x47a247=$dataItems[_0x3d9d4e['id']];if(_0x3d9d4e[_0x1dd192(0x180)]===0x1)_0x47a247=$dataWeapons[_0x3d9d4e['id']];if(_0x3d9d4e[_0x1dd192(0x180)]===0x2)_0x47a247=$dataArmors[_0x3d9d4e['id']];if(!_0x47a247)return'';return _0x3e87e9?_0x1dd192(0x365)[_0x1dd192(0x27c)](_0x47a247[_0x1dd192(0x267)],_0x47a247[_0x1dd192(0x1a4)]):_0x47a247['name'];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x112)]=function(){const _0x251263=_0x17a7f4,_0x328d2f=$gameParty[_0x251263(0x2d9)]();if(_0x328d2f['id']<=0x0)return'';return _0x328d2f[_0x251263(0x135)];},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1a5)]=function(_0x34da0b,_0x2c96d5){const _0x1e9efb=_0x17a7f4,_0x4f2c8d=VisuMZ[_0x1e9efb(0x1ff)]['Settings'][_0x1e9efb(0x33f)];let _0x5a43ab=0x0;if(_0x2c96d5===$dataActors)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x24e)];if(_0x2c96d5===$dataClasses)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x13d)];if(_0x2c96d5===$dataSkills)_0x5a43ab=_0x4f2c8d['Skills'];if(_0x2c96d5===$dataItems)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x33d)];if(_0x2c96d5===$dataWeapons)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x328)];if(_0x2c96d5===$dataArmors)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x2b3)];if(_0x2c96d5===$dataEnemies)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x204)];if(_0x2c96d5===$dataStates)_0x5a43ab=_0x4f2c8d[_0x1e9efb(0x11b)];return _0x5a43ab>0x0&&(_0x34da0b=_0x1e9efb(0x178)[_0x1e9efb(0x27c)](_0x5a43ab,_0x34da0b)),_0x34da0b;},Window_Base['prototype']['prepareWordWrapEscapeCharacters']=function(_0x460d2b){const _0x2c1f9a=_0x17a7f4;_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x5b8b14,_0xaba398)=>this['setWordWrap'](!![])),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x5cfc9f,_0x401803)=>this['setWordWrap'](![])),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2baa54,_0x360f73)=>this[_0x2c1f9a(0x11c)](![]));if(_0x460d2b[_0x2c1f9a(0x193)](Window_Message['_autoSizeRegexp']))this[_0x2c1f9a(0x11c)](![]);else _0x460d2b[_0x2c1f9a(0x193)](Window_Message[_0x2c1f9a(0x307)])&&this[_0x2c1f9a(0x11c)](![]);if(!this[_0x2c1f9a(0x1c2)]())return _0x460d2b;if(_0x460d2b[_0x2c1f9a(0x194)]<=0x0)return _0x460d2b;return VisuMZ[_0x2c1f9a(0x1ff)][_0x2c1f9a(0x34e)]['WordWrap'][_0x2c1f9a(0x23a)]?(_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/[\n\r]+/g,'\x20'),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x460d2b=_0x460d2b['replace'](/[\n\r]+/g,''),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x460d2b=this[_0x2c1f9a(0x158)](_0x460d2b),_0x460d2b=_0x460d2b[_0x2c1f9a(0x1c5)]('\x20')[_0x2c1f9a(0x211)](_0x2c1f9a(0x318)),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x460d2b=_0x460d2b[_0x2c1f9a(0x36d)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x460d2b;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x158)]=function(_0x38895b){return _0x38895b;},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x140)]=Window_Base['prototype'][_0x17a7f4(0x162)],Window_Base[_0x17a7f4(0x29f)]['processNewLine']=function(_0x475db0){const _0x544a47=_0x17a7f4;VisuMZ['MessageCore'][_0x544a47(0x140)]['call'](this,_0x475db0),this['processTextAlignmentX'](_0x475db0);},VisuMZ[_0x17a7f4(0x1ff)]['Window_Base_processControlCharacter']=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1a6)],Window_Base[_0x17a7f4(0x29f)]['processControlCharacter']=function(_0x27ceeb,_0x263290){const _0x29acb3=_0x17a7f4;VisuMZ[_0x29acb3(0x1ff)][_0x29acb3(0x326)][_0x29acb3(0x24f)](this,_0x27ceeb,_0x263290),_0x263290===_0x29acb3(0x318)&&this[_0x29acb3(0x2e7)](_0x27ceeb);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x114)]=function(_0x2fd21a){const _0x258d15=_0x17a7f4;var _0x23e9b5=/^\<(.*?)\>/[_0x258d15(0x38d)](_0x2fd21a['text']['slice'](_0x2fd21a[_0x258d15(0x261)]));if(_0x23e9b5)return _0x2fd21a[_0x258d15(0x261)]+=_0x23e9b5[0x0][_0x258d15(0x194)],String(_0x23e9b5[0x0][_0x258d15(0x17f)](0x1,_0x23e9b5[0x0][_0x258d15(0x194)]-0x1));else{if(_0x258d15(0x244)!==_0x258d15(0x281))return'';else{function _0x3e0cfd(){const _0x2df954=_0x258d15;return this[_0x2df954(0x2c4)]()===0x191;}}}},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x121)]=Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x38e)],Window_Base[_0x17a7f4(0x29f)]['processEscapeCharacter']=function(_0x57e732,_0x374ed6){const _0x5ecd5a=_0x17a7f4;switch(_0x57e732){case'C':if(_0x374ed6[_0x5ecd5a(0x2eb)]){if(_0x5ecd5a(0x220)==='iioXM'){function _0x3dcdb3(){const _0x371772=_0x5ecd5a;this[_0x371772(0x2fb)][_0x371772(0x22c)]=!!_0xb38e7b;}}else VisuMZ[_0x5ecd5a(0x1ff)][_0x5ecd5a(0x121)]['call'](this,_0x57e732,_0x374ed6);}else this[_0x5ecd5a(0x390)](_0x374ed6);break;case'I':case'{':case'}':VisuMZ[_0x5ecd5a(0x1ff)][_0x5ecd5a(0x121)][_0x5ecd5a(0x24f)](this,_0x57e732,_0x374ed6);break;case'FS':this[_0x5ecd5a(0x2c2)](_0x374ed6);break;case'PX':this[_0x5ecd5a(0x387)](_0x374ed6);break;case'PY':this[_0x5ecd5a(0x24a)](_0x374ed6);break;case _0x5ecd5a(0x1f6):this[_0x5ecd5a(0x382)](this[_0x5ecd5a(0x390)](_0x374ed6));break;case _0x5ecd5a(0x2a2):this[_0x5ecd5a(0x197)](_0x374ed6);break;case _0x5ecd5a(0x35d):this[_0x5ecd5a(0x216)](_0x374ed6);break;case'COMMONEVENT':this[_0x5ecd5a(0x183)](_0x374ed6);break;case _0x5ecd5a(0x1dd):this['processFontChangeItalic'](this[_0x5ecd5a(0x390)](_0x374ed6));break;case'PICTURE':this['processDrawPicture'](_0x374ed6);break;case'PREVCOLOR':this[_0x5ecd5a(0x171)](_0x374ed6);break;case _0x5ecd5a(0x379):this[_0x5ecd5a(0x31a)](_0x374ed6);break;case _0x5ecd5a(0x352):this['processCustomWait'](_0x374ed6);break;case _0x5ecd5a(0x160):this['processWrapBreak'](_0x374ed6);break;default:this[_0x5ecd5a(0x20c)](_0x57e732,_0x374ed6);}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x20c)]=function(_0x11807c,_0x34b700){const _0x417874=_0x17a7f4;for(const _0x215966 of VisuMZ[_0x417874(0x1ff)][_0x417874(0x34e)][_0x417874(0x358)]){if(_0x215966[_0x417874(0x20b)]===_0x11807c){if(_0x215966[_0x417874(0x25c)]==='')this['obtainEscapeParam'](_0x34b700);_0x215966[_0x417874(0x32b)][_0x417874(0x24f)](this,_0x34b700);if(this[_0x417874(0x321)]===Window_Message){const _0x402f1e=_0x215966[_0x417874(0x131)]||0x0;if(_0x402f1e>0x0)this[_0x417874(0x273)](_0x402f1e);}}}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x366)]=function(){const _0x1efe65=_0x17a7f4;this['contents'][_0x1efe65(0x23e)]+=VisuMZ[_0x1efe65(0x1ff)][_0x1efe65(0x34e)][_0x1efe65(0x2ed)][_0x1efe65(0x17b)],this[_0x1efe65(0x2fb)][_0x1efe65(0x23e)]=Math[_0x1efe65(0x15c)](this[_0x1efe65(0x2fb)]['fontSize'],VisuMZ[_0x1efe65(0x1ff)]['Settings'][_0x1efe65(0x2ed)][_0x1efe65(0x227)]);},Window_Base[_0x17a7f4(0x29f)]['makeFontSmaller']=function(){const _0x41c8c8=_0x17a7f4;this[_0x41c8c8(0x2fb)]['fontSize']-=VisuMZ['MessageCore'][_0x41c8c8(0x34e)]['General']['FontChangeValue'],this[_0x41c8c8(0x2fb)][_0x41c8c8(0x23e)]=Math[_0x41c8c8(0x368)](this['contents']['fontSize'],VisuMZ[_0x41c8c8(0x1ff)][_0x41c8c8(0x34e)][_0x41c8c8(0x2ed)]['FontSmallerCap']);},Window_Base['prototype'][_0x17a7f4(0x2c2)]=function(_0x47133d){const _0x130e98=_0x17a7f4,_0x4d398f=this[_0x130e98(0x390)](_0x47133d);this[_0x130e98(0x2fb)]['fontSize']=_0x4d398f[_0x130e98(0x287)](VisuMZ[_0x130e98(0x1ff)]['Settings'][_0x130e98(0x2ed)][_0x130e98(0x25f)],VisuMZ[_0x130e98(0x1ff)]['Settings']['General'][_0x130e98(0x227)]);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x134)]=function(_0x4fe9b1){const _0x5dfe5a=_0x17a7f4;let _0xa626f6=this[_0x5dfe5a(0x2fb)]['fontSize'];const _0x1fefb2=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x5dfe5a(0x2c0)!=='fKUxt'){function _0xaeefe5(){const _0x447592=_0x5dfe5a,_0x13c9ca=_0x34afc0[_0x447592(0x1ca)]();if(_0x13c9ca===0x1)return(_0x492214['boxWidth']-this[_0x447592(0x33e)]())/0x2;else return _0x13c9ca===0x2?this[_0x447592(0x36a)]['x']+this[_0x447592(0x36a)][_0x447592(0x2d2)]-this[_0x447592(0x33e)]():this[_0x447592(0x36a)]['x'];}}else{const _0x4d49b4=_0x1fefb2[_0x5dfe5a(0x38d)](_0x4fe9b1);if(!_0x4d49b4)break;const _0x42887d=String(_0x4d49b4[0x1])[_0x5dfe5a(0x253)]();if(_0x42887d==='{')this[_0x5dfe5a(0x366)]();else{if(_0x42887d==='}'){if('gEqMo'!==_0x5dfe5a(0x2c6)){function _0x504d87(){const _0x53b346=_0x5dfe5a;if(this[_0x53b346(0x12e)]===_0xa77dce)this[_0x53b346(0x25d)]();if(this[_0x53b346(0x12e)][_0x53b346(0x35b)]===_0x133819)this[_0x53b346(0x25d)]();return this['_MessageCoreSettings'][_0x53b346(0x35b)];}}else this[_0x5dfe5a(0x248)]();}else _0x42887d==='FS'&&(this['contents']['fontSize']=parseInt(_0x4d49b4[0x3])[_0x5dfe5a(0x287)](VisuMZ['MessageCore'][_0x5dfe5a(0x34e)][_0x5dfe5a(0x2ed)][_0x5dfe5a(0x25f)],VisuMZ['MessageCore'][_0x5dfe5a(0x34e)][_0x5dfe5a(0x2ed)]['FontBiggerCap']));}if(this[_0x5dfe5a(0x2fb)]['fontSize']>_0xa626f6){if(_0x5dfe5a(0x362)!==_0x5dfe5a(0x362)){function _0x4c5881(){const _0x48e955=_0x5dfe5a;let _0x192381=_0x41a016;return _0x192381=_0x192381[_0x48e955(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x192381=_0x192381['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x192381;}}else _0xa626f6=this[_0x5dfe5a(0x2fb)][_0x5dfe5a(0x23e)];}}}return _0xa626f6;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x387)]=function(_0x3182d1){const _0xcdf759=_0x17a7f4;_0x3182d1['x']=this['obtainEscapeParam'](_0x3182d1),VisuMZ[_0xcdf759(0x1ff)][_0xcdf759(0x34e)][_0xcdf759(0x2ed)]['RelativePXPY']&&(_0x3182d1['x']+=_0x3182d1[_0xcdf759(0x214)]);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x24a)]=function(_0x1d918a){const _0x166753=_0x17a7f4;_0x1d918a['y']=this[_0x166753(0x390)](_0x1d918a),VisuMZ[_0x166753(0x1ff)][_0x166753(0x34e)][_0x166753(0x2ed)][_0x166753(0x22d)]&&(_0x1d918a['y']+=_0x1d918a['startY']);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x382)]=function(_0x18cfa7){const _0x620c31=_0x17a7f4;this[_0x620c31(0x2fb)][_0x620c31(0x22c)]=!!_0x18cfa7;},Window_Base['prototype'][_0x17a7f4(0x33a)]=function(_0x59628d){const _0x32e2d5=_0x17a7f4;this[_0x32e2d5(0x2fb)][_0x32e2d5(0x269)]=!!_0x59628d;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x31a)]=function(_0x388534){const _0x19756f=_0x17a7f4,_0x4e694c=this[_0x19756f(0x390)](_0x388534);if(!_0x388534[_0x19756f(0x2eb)])return;switch(_0x4e694c){case 0x0:this['setTextAlignment'](_0x19756f(0x2f0));return;case 0x1:this[_0x19756f(0x1ae)](_0x19756f(0x1ac));break;case 0x2:this['setTextAlignment'](_0x19756f(0x33b));break;case 0x3:this['setTextAlignment'](_0x19756f(0x17a));break;}this['processTextAlignmentX'](_0x388534);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x353)]=function(_0x48ea6c){const _0xcf6322=_0x17a7f4;if(!_0x48ea6c[_0xcf6322(0x2eb)])return;if(_0x48ea6c[_0xcf6322(0x2d6)])return;if(this[_0xcf6322(0x2cd)]()==='default')return;let _0x458d0c=_0x48ea6c['text'][_0xcf6322(0x21a)](_0xcf6322(0x19b),_0x48ea6c[_0xcf6322(0x261)]+0x1),_0x2e7c71=_0x48ea6c[_0xcf6322(0x21f)][_0xcf6322(0x21a)]('\x0a',_0x48ea6c['index']+0x1);if(_0x458d0c<0x0)_0x458d0c=_0x48ea6c['text'][_0xcf6322(0x194)]+0x1;if(_0x2e7c71>0x0)_0x458d0c=Math[_0xcf6322(0x15c)](_0x458d0c,_0x2e7c71);const _0x3b271d=_0x48ea6c['text'][_0xcf6322(0x1b9)](_0x48ea6c['index'],_0x458d0c),_0x2f3643=this[_0xcf6322(0x2cf)](_0x3b271d)[_0xcf6322(0x2d2)],_0x584f64=_0x48ea6c[_0xcf6322(0x2d2)]||this[_0xcf6322(0x14b)]-0x8,_0x4fe629=this['constructor']===Window_Message&&$gameMessage[_0xcf6322(0x36f)]()!=='';switch(this[_0xcf6322(0x2cd)]()){case _0xcf6322(0x1ac):_0x48ea6c['x']=_0x48ea6c[_0xcf6322(0x214)];break;case'center':_0x48ea6c['x']=_0x48ea6c[_0xcf6322(0x214)],_0x48ea6c['x']+=Math[_0xcf6322(0x31d)]((_0x584f64-_0x2f3643)/0x2);_0x4fe629&&(_0x48ea6c['x']-=_0x48ea6c['startX']/0x2);break;case'right':_0x48ea6c['x']=_0x584f64-_0x2f3643+_0x48ea6c[_0xcf6322(0x214)];_0x4fe629&&(_0x48ea6c['x']-=_0x48ea6c[_0xcf6322(0x214)]);break;}},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x2cf)]=function(_0x51a61b){const _0x4c0a52=_0x17a7f4;_0x51a61b=_0x51a61b[_0x4c0a52(0x36d)](/\x1b!/g,''),_0x51a61b=_0x51a61b[_0x4c0a52(0x36d)](/\x1b\|/g,''),_0x51a61b=_0x51a61b[_0x4c0a52(0x36d)](/\x1b\./g,'');const _0x1eee58=this[_0x4c0a52(0x1a9)](_0x51a61b,0x0,0x0,0x0),_0x4bcc2c=this[_0x4c0a52(0x30f)]();return _0x1eee58['drawing']=![],this['processAllText'](_0x1eee58),this[_0x4c0a52(0x309)](_0x4bcc2c),{'width':_0x1eee58[_0x4c0a52(0x128)],'height':_0x1eee58[_0x4c0a52(0x2a7)]};},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x2e7)]=function(_0x59d0c6){const _0x109ff=_0x17a7f4,_0x52cd77=(_0x59d0c6[_0x109ff(0x2d6)]?-0x1:0x1)*this['textWidth']('\x20');_0x59d0c6['x']+=_0x52cd77;if(this[_0x109ff(0x390)](_0x59d0c6)>0x0)_0x59d0c6['x']+=_0x52cd77;if(_0x59d0c6[_0x109ff(0x2d6)])return;let _0x12e1c0=_0x59d0c6[_0x109ff(0x21f)]['indexOf'](_0x109ff(0x318),_0x59d0c6['index']+0x1),_0x20b5d5=_0x59d0c6[_0x109ff(0x21f)][_0x109ff(0x21a)]('\x0a',_0x59d0c6[_0x109ff(0x261)]+0x1);if(_0x12e1c0<0x0)_0x12e1c0=_0x59d0c6['text']['length']+0x1;if(_0x20b5d5>0x0)_0x12e1c0=Math[_0x109ff(0x15c)](_0x12e1c0,_0x20b5d5);const _0x39f6ec=_0x59d0c6[_0x109ff(0x21f)][_0x109ff(0x1b9)](_0x59d0c6[_0x109ff(0x261)],_0x12e1c0),_0x50bea1=this[_0x109ff(0x1c4)](_0x39f6ec)[_0x109ff(0x2d2)];let _0x1ac268=_0x59d0c6[_0x109ff(0x2d2)]||this[_0x109ff(0x14b)];if(this[_0x109ff(0x321)]===Window_Message){if(_0x109ff(0x2b6)===_0x109ff(0x2b6)){const _0x115ae8=$gameMessage[_0x109ff(0x36f)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x1ac268-=_0x115ae8,VisuMZ[_0x109ff(0x1ff)][_0x109ff(0x34e)][_0x109ff(0x30d)][_0x109ff(0x166)]&&(_0x1ac268-=_0x115ae8);}else{function _0x58a0f1(){const _0x22c583=_0x109ff;let _0x3df854=_0x467c8c[_0x22c583(0x21f)];this[_0x22c583(0x1df)]={};if(this[_0x22c583(0x1c2)]())return _0x3df854;_0x3df854=_0x3df854['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x5c8975,_0x5aefa4)=>{const _0x1403f2=_0x22c583,_0x46a848=_0x5aefa4[_0x1403f2(0x1c5)](',')[_0x1403f2(0x34f)](_0x2d5620=>_0x2a10ac(_0x2d5620)||0x0);if(_0x46a848[0x0]!==_0x2ff338)this[_0x1403f2(0x1df)]['x']=_0x20cb89(_0x46a848[0x0]);if(_0x46a848[0x1]!==_0x4696a9)this[_0x1403f2(0x1df)]['y']=_0x5f3ac3(_0x46a848[0x1]);if(_0x46a848[0x2]!==_0x506bd7)this[_0x1403f2(0x1df)][_0x1403f2(0x2d2)]=_0x59fb6c(_0x46a848[0x2]);if(_0x46a848[0x3]!==_0x424287)this[_0x1403f2(0x1df)][_0x1403f2(0x1d9)]=_0x11dc94(_0x46a848[0x3]);return'';}),_0x3df854=_0x3df854['replace'](/<COORDINATES:[ ]*(.*)>/gi,(_0x1cec36,_0x2cc4b4)=>{const _0x1594ac=_0x22c583,_0x157694=_0x2cc4b4['split'](',')[_0x1594ac(0x34f)](_0x428642=>_0x2099ba(_0x428642)||0x0);if(_0x157694[0x0]!==_0x1d632f)this[_0x1594ac(0x1df)]['x']=_0x2073e8(_0x157694[0x0]);if(_0x157694[0x1]!==_0x54f714)this[_0x1594ac(0x1df)]['y']=_0x5109ba(_0x157694[0x1]);return'';}),_0x3df854=_0x3df854[_0x22c583(0x36d)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x11bb8e,_0x58ce76)=>{const _0xb2fa4=_0x22c583,_0x309060=_0x58ce76[_0xb2fa4(0x1c5)](',')[_0xb2fa4(0x34f)](_0x3fab52=>_0x4e7b9c(_0x3fab52)||0x0);if(_0x309060[0x0]!==_0x57d47c)this[_0xb2fa4(0x1df)][_0xb2fa4(0x2d2)]=_0x4df746(_0x309060[0x2]);if(_0x309060[0x1]!==_0x114a70)this[_0xb2fa4(0x1df)][_0xb2fa4(0x1d9)]=_0xf97e1a(_0x309060[0x3]);return'';}),_0x4729de[_0x22c583(0x21f)]=_0x3df854;}}}let _0x20af19=![];if(_0x59d0c6['x']+_0x50bea1>_0x59d0c6[_0x109ff(0x214)]+_0x1ac268)_0x20af19=!![];if(_0x50bea1===0x0)_0x20af19=!![];_0x20af19&&(_0x59d0c6[_0x109ff(0x21f)]=_0x59d0c6[_0x109ff(0x21f)][_0x109ff(0x17f)](0x0,_0x59d0c6[_0x109ff(0x261)])+'\x0a'+_0x59d0c6['text']['substr'](_0x59d0c6[_0x109ff(0x261)]));},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1c4)]=function(_0x4f4e0f){const _0x19dc3b=_0x17a7f4,_0x1a6332=this[_0x19dc3b(0x1a9)](_0x4f4e0f,0x0,0x0,0x0),_0x58028b=this['getPreservedFontSettings']();return _0x1a6332['drawing']=![],this['setWordWrap'](![]),this[_0x19dc3b(0x152)](_0x1a6332),this[_0x19dc3b(0x11c)](!![]),this[_0x19dc3b(0x309)](_0x58028b),{'width':_0x1a6332[_0x19dc3b(0x128)],'height':_0x1a6332[_0x19dc3b(0x2a7)]};},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x183)]=function(_0x1f3712){const _0x257fe4=_0x17a7f4;return this[_0x257fe4(0x390)](_0x1f3712);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1ea)]=function(_0x322377){const _0x3bcbb4=_0x17a7f4,_0x11ead8=this[_0x3bcbb4(0x114)](_0x322377)[_0x3bcbb4(0x1c5)](',');if(!_0x322377[_0x3bcbb4(0x2eb)])return;const _0x2014f1=_0x11ead8[0x0]['trim'](),_0xef3378=_0x11ead8[0x1]||0x0,_0x16069b=_0x11ead8[0x2]||0x0,_0x302347=ImageManager[_0x3bcbb4(0x191)](_0x2014f1),_0xe3970b=this['contents'][_0x3bcbb4(0x1fd)];_0x302347[_0x3bcbb4(0x1c1)](this['drawBackPicture'][_0x3bcbb4(0x35a)](this,_0x302347,_0x322377['x'],_0x322377['y'],_0xef3378,_0x16069b,_0xe3970b));},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x1ed)]=function(_0x2dc35a,_0x1d8b16,_0x3760df,_0x53a92e,_0x289bca,_0x48c276){const _0x4a359f=_0x17a7f4;_0x53a92e=_0x53a92e||_0x2dc35a['width'],_0x289bca=_0x289bca||_0x2dc35a[_0x4a359f(0x1d9)],this['contentsBack']['paintOpacity']=_0x48c276,this[_0x4a359f(0x31e)][_0x4a359f(0x1e2)](_0x2dc35a,0x0,0x0,_0x2dc35a[_0x4a359f(0x2d2)],_0x2dc35a[_0x4a359f(0x1d9)],_0x1d8b16,_0x3760df,_0x53a92e,_0x289bca),this['contentsBack']['paintOpacity']=0xff;},Window_Base['prototype'][_0x17a7f4(0x197)]=function(_0x2220fc){const _0x5f2604=_0x17a7f4,_0x521efc=this[_0x5f2604(0x114)](_0x2220fc)[_0x5f2604(0x1c5)](',');if(!_0x2220fc[_0x5f2604(0x2eb)])return;const _0x667dba=_0x521efc[0x0][_0x5f2604(0x1d6)](),_0x5bf3d2=ImageManager[_0x5f2604(0x191)](_0x667dba),_0x280eae=JsonEx['makeDeepCopy'](_0x2220fc),_0x427f66=this[_0x5f2604(0x2fb)][_0x5f2604(0x1fd)];_0x5bf3d2[_0x5f2604(0x1c1)](this[_0x5f2604(0x22b)][_0x5f2604(0x35a)](this,_0x5bf3d2,_0x280eae,_0x427f66));},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x22b)]=function(_0xb097a7,_0x439b9e,_0x5b72ef){const _0xceb62a=_0x17a7f4,_0x31ac7c=_0x439b9e[_0xceb62a(0x2d2)]||this[_0xceb62a(0x14b)],_0x570d8f=this[_0xceb62a(0x147)]!==undefined?this[_0xceb62a(0x2bd)]():this[_0xceb62a(0x2d4)],_0x65c6b=_0x31ac7c/_0xb097a7[_0xceb62a(0x2d2)],_0x3edd32=_0x570d8f/_0xb097a7['height'],_0x3c53e2=Math[_0xceb62a(0x15c)](_0x65c6b,_0x3edd32,0x1),_0x49be9c=this['_index']!==undefined?(this[_0xceb62a(0x1ad)](0x0)[_0xceb62a(0x1d9)]-this[_0xceb62a(0x238)]())/0x2:0x0,_0x101264=_0xb097a7[_0xceb62a(0x2d2)]*_0x3c53e2,_0x55e612=_0xb097a7[_0xceb62a(0x1d9)]*_0x3c53e2,_0x35649c=Math[_0xceb62a(0x31d)]((_0x31ac7c-_0x101264)/0x2)+_0x439b9e[_0xceb62a(0x214)],_0x328326=Math['floor']((_0x570d8f-_0x55e612)/0x2)+_0x439b9e['startY']-_0x49be9c*0x2;this[_0xceb62a(0x31e)][_0xceb62a(0x1fd)]=_0x5b72ef,this[_0xceb62a(0x31e)]['blt'](_0xb097a7,0x0,0x0,_0xb097a7[_0xceb62a(0x2d2)],_0xb097a7[_0xceb62a(0x1d9)],_0x35649c,_0x328326,_0x101264,_0x55e612),this['contentsBack'][_0xceb62a(0x1fd)]=0xff;},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x216)]=function(_0x38ab75){const _0x4457da=_0x17a7f4,_0x53d8bf=this[_0x4457da(0x390)](_0x38ab75);if(_0x38ab75['drawing'])this[_0x4457da(0x30a)](_0x53d8bf>0x0);},Window_Base[_0x17a7f4(0x29f)][_0x17a7f4(0x26d)]=function(_0x452efc){const _0x37c4fe=_0x17a7f4,_0x236d18=this['obtainEscapeParam'](_0x452efc);if(this['constructor']===Window_Message&&_0x452efc[_0x37c4fe(0x2eb)]){if(_0x37c4fe(0x1be)===_0x37c4fe(0x1be))this['startWait'](_0x236d18);else{function _0xcea26d(){const _0xb8be38=_0x37c4fe;return this[_0xb8be38(0x1c0)](_0x3050cf,!![],!![]),this[_0xb8be38(0x12d)]('map\x20event',_0x40f3f7(_0x58647b)||0x0),'';}}}},Window_Help[_0x17a7f4(0x29f)]['resetWordWrap']=function(){const _0x8b0dd0=_0x17a7f4;this[_0x8b0dd0(0x11c)]($gameSystem[_0x8b0dd0(0x363)]());},Window_Help[_0x17a7f4(0x29f)][_0x17a7f4(0x120)]=function(){return!![];},VisuMZ[_0x17a7f4(0x1ff)]['Window_Help_refresh']=Window_Help[_0x17a7f4(0x29f)][_0x17a7f4(0x28d)],Window_Help[_0x17a7f4(0x29f)]['refresh']=function(){const _0x4940da=_0x17a7f4;this[_0x4940da(0x34d)](),VisuMZ[_0x4940da(0x1ff)][_0x4940da(0x2f1)][_0x4940da(0x24f)](this),this[_0x4940da(0x16d)]();},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x1e6)]=Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x1f5)],Window_Options[_0x17a7f4(0x29f)]['addGeneralOptions']=function(){const _0x84270c=_0x17a7f4;VisuMZ[_0x84270c(0x1ff)][_0x84270c(0x1e6)][_0x84270c(0x24f)](this),this['addMessageCoreCommands']();},Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x24c)]=function(){const _0x472b5c=_0x17a7f4;if(VisuMZ[_0x472b5c(0x1ff)]['Settings']['TextSpeed'][_0x472b5c(0x1b4)]){if('agGEh'!==_0x472b5c(0x316))this[_0x472b5c(0x190)]();else{function _0x34db53(){const _0x5dabc5=_0x472b5c;_0x582137[_0x5dabc5(0x1ff)][_0x5dabc5(0x1bc)][_0x5dabc5(0x24f)](this,_0xe01b20);const _0x5878d8=_0x4339e1[_0x5dabc5(0x1ff)][_0x5dabc5(0x34e)][_0x5dabc5(0x33f)];_0x40a810['MessageCore'][_0x5dabc5(0x1bd)](_0x5d38e8,_0x5878d8[_0x5dabc5(0x2b3)]);}}}},Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x190)]=function(){const _0x50224f=_0x17a7f4,_0x584185=TextManager[_0x50224f(0x336)],_0x523377=_0x50224f(0x2bf);this[_0x50224f(0x237)](_0x584185,_0x523377);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x22e)]=Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x280)],Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x280)]=function(_0x52fa1c){const _0xe087c=_0x17a7f4,_0x27f0e9=this[_0xe087c(0x322)](_0x52fa1c);if(_0x27f0e9==='textSpeed')return this[_0xe087c(0x196)]();return VisuMZ[_0xe087c(0x1ff)][_0xe087c(0x22e)][_0xe087c(0x24f)](this,_0x52fa1c);},VisuMZ['MessageCore'][_0x17a7f4(0x2e5)]=Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x144)],Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x144)]=function(_0x20fdb5){const _0x17beae=_0x17a7f4;if(_0x20fdb5===_0x17beae(0x2bf))return!![];return VisuMZ['MessageCore'][_0x17beae(0x2e5)][_0x17beae(0x24f)](this,_0x20fdb5);},Window_Options[_0x17a7f4(0x29f)]['textSpeedStatusText']=function(){const _0x7a2874=_0x17a7f4,_0x20c468=this[_0x7a2874(0x2d3)]('textSpeed');return _0x20c468>0xa?TextManager['instantTextSpeed']:_0x20c468;},VisuMZ['MessageCore'][_0x17a7f4(0x283)]=Window_Options[_0x17a7f4(0x29f)]['changeVolume'],Window_Options[_0x17a7f4(0x29f)][_0x17a7f4(0x345)]=function(_0x218df1,_0x13e918,_0x26de14){const _0x214bdc=_0x17a7f4;if(_0x218df1==='textSpeed')return this[_0x214bdc(0x1b6)](_0x218df1,_0x13e918,_0x26de14);VisuMZ['MessageCore'][_0x214bdc(0x283)][_0x214bdc(0x24f)](this,_0x218df1,_0x13e918,_0x26de14);},Window_Options[_0x17a7f4(0x29f)]['changeTextSpeed']=function(_0x4424db,_0x5141f1,_0x2e1c9a){const _0x59c9df=_0x17a7f4,_0x24c43b=this[_0x59c9df(0x2d3)](_0x4424db),_0x195238=0x1,_0xe60a5b=_0x24c43b+(_0x5141f1?_0x195238:-_0x195238);_0xe60a5b>0xb&&_0x2e1c9a?this[_0x59c9df(0x324)](_0x4424db,0x1):this['changeValue'](_0x4424db,_0xe60a5b[_0x59c9df(0x287)](0x1,0xb));},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x1aa)]=function(){const _0x223a2e=_0x17a7f4;Window_Base[_0x223a2e(0x29f)][_0x223a2e(0x1aa)][_0x223a2e(0x24f)](this);if(VisuMZ[_0x223a2e(0x1ff)][_0x223a2e(0x34e)][_0x223a2e(0x2ed)][_0x223a2e(0x35c)]){if('IwHpa'===_0x223a2e(0x219)){function _0x134bfb(){const _0x5e57e0=_0x223a2e;this['y']=_0x5cd394['y']+_0x34bf6a[_0x5e57e0(0x1d9)];}}else this[_0x223a2e(0x16a)]();}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x16a)]=function(){const _0x30d8d2=_0x17a7f4;this[_0x30d8d2(0x262)]['x']=Math[_0x30d8d2(0x2e9)](this[_0x30d8d2(0x2d2)]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this[_0x30d8d2(0x262)]['scale']['x']=Graphics[_0x30d8d2(0x2d2)];},VisuMZ[_0x17a7f4(0x1ff)]['Window_Message_clearFlags']=Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x240)],Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x240)]=function(){const _0x57f453=_0x17a7f4;VisuMZ[_0x57f453(0x1ff)]['Window_Message_clearFlags']['call'](this),this[_0x57f453(0x34d)](),this['resetWordWrap'](),this['setColorLock'](![]),this['setTextAlignment'](_0x57f453(0x2f0)),this['setTextDelay'](VisuMZ[_0x57f453(0x1ff)][_0x57f453(0x34e)][_0x57f453(0x2ed)][_0x57f453(0x266)]);},Window_Message[_0x17a7f4(0x29f)]['resetWordWrap']=function(){const _0x2b4e78=_0x17a7f4;this[_0x2b4e78(0x11c)]($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x120)]=function(){return!![];},Window_Message['prototype'][_0x17a7f4(0x2b8)]=function(_0x1dc260){const _0x32162c=_0x17a7f4,_0x103fd4=0xb-ConfigManager['textSpeed'];_0x1dc260=Math['round'](_0x1dc260*_0x103fd4),this[_0x32162c(0x325)]=_0x1dc260,this['_textDelay']=_0x1dc260;},VisuMZ['MessageCore'][_0x17a7f4(0x2d8)]=Window_Message['prototype'][_0x17a7f4(0x23c)],Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x23c)]=function(){const _0x4ec0dd=_0x17a7f4;return VisuMZ[_0x4ec0dd(0x1ff)][_0x4ec0dd(0x2d8)][_0x4ec0dd(0x24f)](this)||Input['isPressed'](VisuMZ[_0x4ec0dd(0x1ff)][_0x4ec0dd(0x34e)][_0x4ec0dd(0x2ed)][_0x4ec0dd(0x231)]);},VisuMZ[_0x17a7f4(0x1ff)]['Window_Message_updatePlacement']=Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x260)],Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x260)]=function(){const _0x7d3d41=_0x17a7f4;let _0x294410=this['y'];VisuMZ['MessageCore'][_0x7d3d41(0x1a7)][_0x7d3d41(0x24f)](this);if(this['_autoPositionTarget'])this['y']=_0x294410;this[_0x7d3d41(0x29a)](),this[_0x7d3d41(0x30c)]();},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x24d)]=Window_Message['prototype'][_0x17a7f4(0x251)],Window_Message['prototype'][_0x17a7f4(0x251)]=function(_0x81c5c6){const _0x58506d=_0x17a7f4;this[_0x58506d(0x215)](_0x81c5c6),VisuMZ['MessageCore']['Window_Message_newPage'][_0x58506d(0x24f)](this,_0x81c5c6),this[_0x58506d(0x355)]();},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x215)]=function(_0x52310b){const _0x45afdd=_0x17a7f4;this['prepareForcedPositionEscapeCharacters'](_0x52310b),this[_0x45afdd(0x31c)](_0x52310b),this['updateDimensions']();},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x2f7)]=Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x188)],Window_Message[_0x17a7f4(0x29f)]['terminateMessage']=function(){const _0x46cb33=_0x17a7f4;VisuMZ[_0x46cb33(0x1ff)][_0x46cb33(0x2f7)][_0x46cb33(0x24f)](this),this[_0x46cb33(0x240)]();if(this[_0x46cb33(0x303)])this['messagePositionReset']();},Window_Message[_0x17a7f4(0x29f)]['updateDimensions']=function(){const _0x5e7234=_0x17a7f4;this[_0x5e7234(0x2d2)]=$gameSystem[_0x5e7234(0x380)]()+this[_0x5e7234(0x235)]();;this['width']=Math['min'](Graphics['width'],this[_0x5e7234(0x2d2)]);const _0x5283b7=$gameSystem[_0x5e7234(0x119)]();this[_0x5e7234(0x1d9)]=SceneManager[_0x5e7234(0x130)][_0x5e7234(0x13a)](_0x5283b7,![])+this[_0x5e7234(0x15f)](),this[_0x5e7234(0x1d9)]=Math[_0x5e7234(0x15c)](Graphics[_0x5e7234(0x1d9)],this['height']);if($gameTemp[_0x5e7234(0x2ba)])this[_0x5e7234(0x259)]();},Window_Message['prototype'][_0x17a7f4(0x235)]=function(){return 0x0;},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x15f)]=function(){return 0x0;},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x259)]=function(){const _0x41dd05=_0x17a7f4;this['x']=(Graphics[_0x41dd05(0x26e)]-this[_0x41dd05(0x2d2)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this['clampPlacementPosition']();},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x305)]=function(){const _0x5d6cfc=_0x17a7f4,_0x1b757f={'x':this['x'],'y':this['y']};Window_Base[_0x5d6cfc(0x29f)]['updateMove'][_0x5d6cfc(0x24f)](this),this[_0x5d6cfc(0x335)](_0x1b757f);},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x14c)]=function(){return!![];},Window_Message['prototype'][_0x17a7f4(0x335)]=function(_0x404b3d){const _0xdea456=_0x17a7f4;if(this[_0xdea456(0x1b3)]){if(_0xdea456(0x27a)===_0xdea456(0x27a))this['_nameBoxWindow']['x']+=this['x']-_0x404b3d['x'],this[_0xdea456(0x1b3)]['y']+=this['y']-_0x404b3d['y'];else{function _0x2798a7(){const _0x56a082=_0xdea456;for(const _0x2a61cd in _0x46d0b0){this[_0x56a082(0x2fb)][_0x2a61cd]=_0x22855d[_0x2a61cd];}}}}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x1c9)]=function(_0x9aa020,_0x2f420b){const _0x2e2bb9=_0x17a7f4;this[_0x2e2bb9(0x2c7)](this[_0x2e2bb9(0x187)]['x'],this['_positionType']*(Graphics['boxHeight']-this[_0x2e2bb9(0x1d9)])/0x2,this[_0x2e2bb9(0x187)][_0x2e2bb9(0x2d2)],this[_0x2e2bb9(0x187)][_0x2e2bb9(0x1d9)],_0x9aa020,_0x2f420b);},Window_Message[_0x17a7f4(0x29f)]['processCommonEvent']=function(_0xc7e150){const _0x5247b9=_0x17a7f4,_0x1e19c5=Window_Base['prototype'][_0x5247b9(0x183)]['call'](this,_0xc7e150);if(_0xc7e150[_0x5247b9(0x2eb)]){if(_0x5247b9(0x35f)===_0x5247b9(0x35f))this[_0x5247b9(0x273)](_0x1e19c5);else{function _0x2271f7(){const _0x1c78c6=_0x5247b9;if(!this[_0x1c78c6(0x164)])return;const _0x49b741=_0x59f7c7[_0x1c78c6(0x130)];if(!_0x49b741)return;if(!_0x49b741[_0x1c78c6(0x246)])return;const _0x2aa432=_0x49b741[_0x1c78c6(0x246)]['findTargetSprite'](this[_0x1c78c6(0x164)]);if(!_0x2aa432)return;let _0x3c1f63=_0x2aa432['x'];_0x3c1f63-=this[_0x1c78c6(0x2d2)]/0x2,_0x3c1f63-=(_0x27b4d5[_0x1c78c6(0x2d2)]-_0x34cad2[_0x1c78c6(0x26e)])/0x2;let _0x1bea59=_0x2aa432['y'];_0x1bea59-=this[_0x1c78c6(0x1d9)],_0x1bea59-=(_0x88a051[_0x1c78c6(0x1d9)]-_0x481fda[_0x1c78c6(0x383)])/0x2,_0x1bea59-=_0x2aa432[_0x1c78c6(0x1d9)]+0x8,this['x']=_0x3e4304[_0x1c78c6(0x2e9)](_0x3c1f63),this['y']=_0x4e1f63[_0x1c78c6(0x2e9)](_0x1bea59),this[_0x1c78c6(0x30c)](!![],![]),this[_0x1c78c6(0x1b3)][_0x1c78c6(0x260)]();}}}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x273)]=function(_0x5e4038){const _0x296106=_0x17a7f4;if($gameParty[_0x296106(0x360)]()){}else{if('MCLHR'!==_0x296106(0x17c))$gameMap[_0x296106(0x2e6)](_0x5e4038);else{function _0x5e3ed6(){const _0x3d2046=_0x296106;this['_dimmerSprite']['x']=_0x2ae43c[_0x3d2046(0x2e9)](this[_0x3d2046(0x2d2)]/0x2),this['_dimmerSprite'][_0x3d2046(0x26a)]['x']=0.5,this[_0x3d2046(0x262)]['scale']['x']=_0x1afb54[_0x3d2046(0x2d2)];}}}},Window_Message[_0x17a7f4(0x29f)]['processCharacter']=function(_0x34fa98){const _0x15a6c5=_0x17a7f4;this['_textDelayCount']--;if(this['_textDelayCount']<=0x0){if(_0x15a6c5(0x1d0)===_0x15a6c5(0x292)){function _0x7f3ad3(){const _0x27a4ac=_0x15a6c5;this[_0x27a4ac(0x2d5)](_0xb16ac1);}}else this[_0x15a6c5(0x2a1)](_0x34fa98),Window_Base[_0x15a6c5(0x29f)]['processCharacter'][_0x15a6c5(0x24f)](this,_0x34fa98);}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x2a1)]=function(_0x11cda7){this['_textDelayCount']=this['_textDelay'];if(this['_textDelay']<=0x0)this['_showFast']=!![];},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x374)]=Window_Message[_0x17a7f4(0x29f)]['processEscapeCharacter'],Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x38e)]=function(_0x1f98ae,_0x14d99e){const _0x3ec875=_0x17a7f4;if(!_0x14d99e[_0x3ec875(0x2eb)]){if(_0x3ec875(0x385)!=='IBmyp'){function _0x4a5161(){const _0x239450=_0x3ec875;this[_0x239450(0x164)]=_0x311c4a;}}else Window_Base[_0x3ec875(0x29f)][_0x3ec875(0x38e)][_0x3ec875(0x24f)](this,_0x1f98ae,_0x14d99e);}else{if(_0x3ec875(0x1ee)!==_0x3ec875(0x18d))VisuMZ['MessageCore'][_0x3ec875(0x374)][_0x3ec875(0x24f)](this,_0x1f98ae,_0x14d99e);else{function _0x5214e7(){const _0x2947dc=_0x3ec875,_0x3a6900=this[_0x2947dc(0x1ad)](_0x27efbf),_0x3f0512=_0x1fde35[_0x2947dc(0x28a)]()!=='default'?_0x2947dc(0x189)[_0x2947dc(0x27c)](_0x271326[_0x2947dc(0x28a)]()):'',_0x24f69e=_0x3f0512+this[_0x2947dc(0x33c)](_0x18f26e);this['changePaintOpacity'](this[_0x2947dc(0x2e1)](_0x5a6712));const _0x414be8=this['textSizeEx'](_0x24f69e)[_0x2947dc(0x1d9)],_0x2cdc20=_0x21ded7[_0x2947dc(0x368)](_0x3a6900['y'],_0x3a6900['y']+_0x5bbc47[_0x2947dc(0x2e9)]((_0x3a6900[_0x2947dc(0x1d9)]-_0x414be8)/0x2));this[_0x2947dc(0x19c)](_0x24f69e,_0x3a6900['x'],_0x2cdc20,_0x3a6900[_0x2947dc(0x2d2)]);}}}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x1e1)]=function(_0x41ecab){const _0x4d8166=_0x17a7f4;let _0x3588eb=_0x41ecab['text'];this[_0x4d8166(0x1df)]={};if(this[_0x4d8166(0x1c2)]())return _0x3588eb;_0x3588eb=_0x3588eb['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x22e4b4,_0x2dc03c)=>{const _0x90942e=_0x4d8166;if(_0x90942e(0x230)!=='rNyZl'){const _0x4ad689=_0x2dc03c[_0x90942e(0x1c5)](',')[_0x90942e(0x34f)](_0x3d2ca0=>Number(_0x3d2ca0)||0x0);if(_0x4ad689[0x0]!==undefined)this[_0x90942e(0x1df)]['x']=Number(_0x4ad689[0x0]);if(_0x4ad689[0x1]!==undefined)this[_0x90942e(0x1df)]['y']=Number(_0x4ad689[0x1]);if(_0x4ad689[0x2]!==undefined)this['_forcedPosition'][_0x90942e(0x2d2)]=Number(_0x4ad689[0x2]);if(_0x4ad689[0x3]!==undefined)this[_0x90942e(0x1df)]['height']=Number(_0x4ad689[0x3]);return'';}else{function _0xe7994(){const _0x29c622=_0x90942e;_0x2fe692['MessageCore']['AddAutoColor'](_0x5001a5,_0xeb6ce['Classes']),_0x194bf3[_0x29c622(0x1ff)]['AddAutoColor'](_0x5c4a37,_0x350d98[_0x29c622(0x2c1)]),_0x3fdd97['MessageCore']['AddAutoColor'](_0x133d0e,_0x5e3f6c[_0x29c622(0x33d)]),_0x2edac1[_0x29c622(0x1ff)][_0x29c622(0x27f)](_0x5693f1,_0x378bbf[_0x29c622(0x328)]),_0x17a782['MessageCore'][_0x29c622(0x27f)](_0x5c7aef,_0x1b8185[_0x29c622(0x2b3)]),_0x44f975[_0x29c622(0x1ff)][_0x29c622(0x27f)](_0x2c7527,_0x146144[_0x29c622(0x204)]),_0xe68877[_0x29c622(0x1ff)][_0x29c622(0x27f)](_0x3b0515,_0x177a3c[_0x29c622(0x11b)]);}}}),_0x3588eb=_0x3588eb[_0x4d8166(0x36d)](/<COORDINATES:[ ]*(.*)>/gi,(_0x3ddfda,_0x51d7e0)=>{const _0x356e38=_0x4d8166;if(_0x356e38(0x308)!==_0x356e38(0x308)){function _0x5a6ef8(){const _0x495a71=_0x356e38;this[_0x495a71(0x229)]=[];}}else{const _0x18afa6=_0x51d7e0[_0x356e38(0x1c5)](',')['map'](_0x36d2fb=>Number(_0x36d2fb)||0x0);if(_0x18afa6[0x0]!==undefined)this[_0x356e38(0x1df)]['x']=Number(_0x18afa6[0x0]);if(_0x18afa6[0x1]!==undefined)this[_0x356e38(0x1df)]['y']=Number(_0x18afa6[0x1]);return'';}}),_0x3588eb=_0x3588eb[_0x4d8166(0x36d)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x408d1d,_0x493f57)=>{const _0xb5cea6=_0x4d8166,_0x3293f1=_0x493f57['split'](',')['map'](_0x5b59a3=>Number(_0x5b59a3)||0x0);if(_0x3293f1[0x0]!==undefined)this[_0xb5cea6(0x1df)][_0xb5cea6(0x2d2)]=Number(_0x3293f1[0x2]);if(_0x3293f1[0x1]!==undefined)this[_0xb5cea6(0x1df)][_0xb5cea6(0x1d9)]=Number(_0x3293f1[0x3]);return'';}),_0x41ecab[_0x4d8166(0x21f)]=_0x3588eb;},Window_Message['prototype']['updateForcedPlacement']=function(){const _0x4feac4=_0x17a7f4;this[_0x4feac4(0x1df)]=this[_0x4feac4(0x1df)]||{};const _0x291508=['x','y',_0x4feac4(0x2d2),'height'];for(const _0x101669 of _0x291508){if(this[_0x4feac4(0x1df)][_0x101669]!==undefined){if('Sahlr'===_0x4feac4(0x201))this[_0x101669]=Number(this['_forcedPosition'][_0x101669]);else{function _0x371016(){const _0x138881=_0x4feac4;return _0x1314c5=_0x15c558[_0x138881(0x36d)](/\x1bN\[(\d+)\]/gi,(_0x44746c,_0x2ba262)=>this[_0x138881(0x1b2)](_0x2554d6(_0x2ba262))),_0x31c6fa=_0x39c05b[_0x138881(0x36d)](/\x1bP\[(\d+)\]/gi,(_0x3390b7,_0x1c94af)=>this[_0x138881(0x21b)](_0x499e71(_0x1c94af))),_0x574306=_0x1ec85e[_0x138881(0x36d)](/\x1bG/gi,_0x1080d8[_0x138881(0x2d7)]),_0x3a0c05;}}}}},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x31c)]=function(_0x488af8){const _0x16f754=_0x17a7f4;let _0x156141=_0x488af8[_0x16f754(0x21f)];_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x1e6637=_0x16f754;if('NdJLh'!==_0x1e6637(0x228))return this[_0x1e6637(0x1c0)](_0x156141,!![],!![]),this[_0x1e6637(0x12d)](_0x1e6637(0x38f)),'';else{function _0x47ce2b(){const _0x2ccf58=_0x1e6637;if(this['_MessageCoreSettings']===_0x2bfa30)this[_0x2ccf58(0x25d)]();if(this[_0x2ccf58(0x12e)][_0x2ccf58(0x233)]===_0xcd51fb)this[_0x2ccf58(0x25d)]();this[_0x2ccf58(0x12e)][_0x2ccf58(0x233)]=_0xf33c0f||0x1;}}}),_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x252c20=_0x16f754;if(_0x252c20(0x375)===_0x252c20(0x375))return this[_0x252c20(0x1c0)](_0x156141,!![],![]),this[_0x252c20(0x12d)](_0x252c20(0x38f)),'';else{function _0x3e197f(){const _0x443d0f=_0x252c20;if(!_0x5ce5a7||!_0x31c833)return-0x1;return _0xc8eb00[_0x443d0f(0x20b)][_0x443d0f(0x194)]-_0x281109[_0x443d0f(0x20b)][_0x443d0f(0x194)];}}}),_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x3c69ca=_0x16f754;return this[_0x3c69ca(0x1c0)](_0x156141,![],!![]),this['processAutoPosition'](_0x3c69ca(0x38f)),'';});if(SceneManager[_0x16f754(0x2ff)]())_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3b8151,_0x3e5760)=>{const _0x474e1d=_0x16f754;return this[_0x474e1d(0x1c0)](_0x156141,!![],!![]),this['processAutoPosition']('battle\x20actor',Number(_0x3e5760)||0x1),'';}),_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4d8645,_0x39262d)=>{const _0x3ddf76=_0x16f754;if(_0x3ddf76(0x1d4)===_0x3ddf76(0x343)){function _0x2966fd(){const _0x1da2a9=_0x3ddf76;return _0x3c2c24[_0x1da2a9(0x320)]();}}else return this['processAutoSize'](_0x156141,!![],!![]),this[_0x3ddf76(0x12d)](_0x3ddf76(0x2ce),Number(_0x39262d)||0x0),'';}),_0x156141=_0x156141['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0xe0b4ec,_0x3a835e)=>{const _0x355963=_0x16f754;if(_0x355963(0x12c)===_0x355963(0x239)){function _0x102866(){const _0x542799=_0x355963;_0x1b35cd[_0x542799(0x1ff)][_0x542799(0x165)]['call'](this,_0x369329);const _0x25aa08=_0x2edbdd[_0x542799(0x1ff)]['Settings'][_0x542799(0x33f)];_0x493802['MessageCore'][_0x542799(0x1bd)](_0x10c09b,_0x25aa08['States']);}}else return this[_0x355963(0x1c0)](_0x156141,!![],!![]),this[_0x355963(0x12d)](_0x355963(0x154),Number(_0x3a835e)||0x0),'';});else SceneManager[_0x16f754(0x32f)]()&&(_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x4bd903,_0xfcc619)=>{const _0x238bd1=_0x16f754;return this[_0x238bd1(0x1c0)](_0x156141,!![],!![]),this['processAutoPosition'](_0x238bd1(0x28b),0x0),'';}),_0x156141=_0x156141['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xc895f2,_0x4c8da6)=>{const _0x5399fe=_0x16f754;if(_0x5399fe(0x1ab)!=='kvGZJ'){function _0x2aa088(){const _0x144bc8=_0x5399fe;this[_0x144bc8(0x2d2)]=_0x263ea7[_0x144bc8(0x380)]()+this[_0x144bc8(0x235)]();;this[_0x144bc8(0x2d2)]=_0x200e2e[_0x144bc8(0x15c)](_0x13efdf[_0x144bc8(0x2d2)],this[_0x144bc8(0x2d2)]);const _0x5ac91a=_0x220a7c['getMessageWindowRows']();this['height']=_0x554258[_0x144bc8(0x130)][_0x144bc8(0x13a)](_0x5ac91a,![])+this[_0x144bc8(0x15f)](),this['height']=_0x2cd9a4['min'](_0x4cd036[_0x144bc8(0x1d9)],this['height']);if(_0x4e4810[_0x144bc8(0x2ba)])this[_0x144bc8(0x259)]();}}else return this['processAutoSize'](_0x156141,!![],!![]),this['processAutoPosition']('map\x20actor',Number(_0x4c8da6)||0x1),'';}),_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1c10d7,_0x4ddf2a)=>{const _0x5b2057=_0x16f754;if(_0x5b2057(0x377)!==_0x5b2057(0x174))return this[_0x5b2057(0x1c0)](_0x156141,!![],!![]),this[_0x5b2057(0x12d)](_0x5b2057(0x386),Number(_0x4ddf2a)||0x0),'';else{function _0x133392(){const _0x2e1fa5=_0x5b2057;_0xc6dbc7[_0x2e1fa5(0x1ff)][_0x2e1fa5(0x14f)][_0x2e1fa5(0x24f)](this),this[_0x2e1fa5(0x25d)]();}}}),_0x156141=_0x156141[_0x16f754(0x36d)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x34060b,_0x1624d6)=>{const _0x44492f=_0x16f754;if(_0x44492f(0x16b)!==_0x44492f(0x16b)){function _0xe02058(){const _0x278843=_0x44492f;return this[_0x278843(0x130)]&&this[_0x278843(0x130)][_0x278843(0x321)]===_0x3df5c2;}}else return this[_0x44492f(0x1c0)](_0x156141,!![],!![]),this[_0x44492f(0x12d)](_0x44492f(0x1b0),Number(_0x1624d6)||0x0),'';}));_0x488af8['text']=_0x156141;},Window_Message[_0x17a7f4(0x2ae)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x17a7f4(0x307)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x17a7f4(0x1c0)]=function(_0x51c250,_0x4b948d,_0x1eee17){const _0x5e85fc=_0x17a7f4;_0x51c250=_0x51c250[_0x5e85fc(0x36d)](Window_Message[_0x5e85fc(0x2ae)],''),_0x51c250=_0x51c250[_0x5e85fc(0x36d)](Window_Message[_0x5e85fc(0x307)],''),this[_0x5e85fc(0x1b7)]=!![];const _0x35056f=this['textSizeEx'](_0x51c250);if(_0x4b948d){let _0x172f6b=_0x35056f[_0x5e85fc(0x2d2)]+$gameSystem[_0x5e85fc(0x378)]()*0x2+0x6;const _0xa46c49=$gameMessage[_0x5e85fc(0x36f)]()!=='',_0x5e81e0=ImageManager[_0x5e85fc(0x125)],_0x247e4d=0x14;_0x172f6b+=_0xa46c49?_0x5e81e0+_0x247e4d:0x4;if(_0x172f6b%0x2!==0x0)_0x172f6b+=0x1;$gameSystem['setMessageWindowWidth'](_0x172f6b);}if(_0x1eee17){if('gOHyZ'!=='gOHyZ'){function _0xc66bb6(){const _0x49feb5=_0x5e85fc;if(_0x54f7f3[_0x49feb5(0x295)]())return;this[_0x49feb5(0x297)]=this[_0x49feb5(0x297)]||0x0;const _0x258790=_0x1f73d8[_0x49feb5(0x1ff)]['Settings']['General'][_0x49feb5(0x116)],_0x58b129=_0x22958d[_0x49feb5(0x1ff)]['Settings'][_0x49feb5(0x2ed)][_0x49feb5(0x312)],_0x345e5c=(0x5-this[_0x49feb5(0x297)])/0x5;this['x']+=_0x33b652['floor'](_0x258790*_0x345e5c),this['y']+=_0x58b129;}}else{let _0x1e9a01=Math[_0x5e85fc(0x357)](_0x35056f[_0x5e85fc(0x1d9)]/this[_0x5e85fc(0x238)]());$gameSystem[_0x5e85fc(0x274)](_0x1e9a01);}}this[_0x5e85fc(0x2f3)](),this[_0x5e85fc(0x1b7)]=![],this['_messagePositionReset']=!![];},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x2f3)]=function(){const _0x1ed1ae=_0x17a7f4;this[_0x1ed1ae(0x133)](),this[_0x1ed1ae(0x260)](),this[_0x1ed1ae(0x259)](),this[_0x1ed1ae(0x19a)](),this[_0x1ed1ae(0x2fb)][_0x1ed1ae(0x19f)](),this['createContents']();},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x12d)]=function(_0x377748,_0xb27f8b){const _0x3664b0=_0x17a7f4;switch(_0x377748[_0x3664b0(0x143)]()[_0x3664b0(0x1d6)]()){case _0x3664b0(0x372):this[_0x3664b0(0x164)]=$gameActors[_0x3664b0(0x1da)](_0xb27f8b);break;case'battle\x20party':this[_0x3664b0(0x164)]=$gameParty[_0x3664b0(0x203)]()[_0xb27f8b-0x1];break;case'battle\x20enemy':this[_0x3664b0(0x164)]=$gameTroop[_0x3664b0(0x203)]()[_0xb27f8b-0x1];break;case _0x3664b0(0x28b):this[_0x3664b0(0x164)]=$gamePlayer;break;case'map\x20actor':const _0x2ee48e=$gameActors[_0x3664b0(0x1da)](_0xb27f8b)[_0x3664b0(0x261)]();_0x2ee48e===0x0?this[_0x3664b0(0x164)]=$gamePlayer:this[_0x3664b0(0x164)]=$gamePlayer[_0x3664b0(0x37c)]()[_0x3664b0(0x36e)](_0x2ee48e-0x1);break;case _0x3664b0(0x386):_0xb27f8b===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x3664b0(0x164)]=$gamePlayer['followers']()[_0x3664b0(0x36e)](_0xb27f8b-0x2);break;case _0x3664b0(0x1b0):this[_0x3664b0(0x164)]=$gameMap[_0x3664b0(0x146)](_0xb27f8b);break;}this[_0x3664b0(0x164)]&&this[_0x3664b0(0x1e4)]();},VisuMZ['MessageCore'][_0x17a7f4(0x175)]=Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x161)],Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x161)]=function(){const _0x36006d=_0x17a7f4;this[_0x36006d(0x1e4)](),VisuMZ[_0x36006d(0x1ff)][_0x36006d(0x175)][_0x36006d(0x24f)](this);},Window_Message['prototype'][_0x17a7f4(0x1e4)]=function(){const _0x5adb00=_0x17a7f4;if(!this[_0x5adb00(0x164)])return;const _0x171087=SceneManager[_0x5adb00(0x130)];if(!_0x171087)return;if(!_0x171087[_0x5adb00(0x246)])return;const _0x3345ea=_0x171087[_0x5adb00(0x246)]['findTargetSprite'](this[_0x5adb00(0x164)]);if(!_0x3345ea)return;let _0x2f20d7=_0x3345ea['x'];_0x2f20d7-=this[_0x5adb00(0x2d2)]/0x2,_0x2f20d7-=(Graphics[_0x5adb00(0x2d2)]-Graphics['boxWidth'])/0x2;let _0x44e626=_0x3345ea['y'];_0x44e626-=this[_0x5adb00(0x1d9)],_0x44e626-=(Graphics[_0x5adb00(0x1d9)]-Graphics[_0x5adb00(0x383)])/0x2,_0x44e626-=_0x3345ea[_0x5adb00(0x1d9)]+0x8,this['x']=Math['round'](_0x2f20d7),this['y']=Math[_0x5adb00(0x2e9)](_0x44e626),this[_0x5adb00(0x30c)](!![],![]),this['_nameBoxWindow']['updatePlacement']();},Window_Message[_0x17a7f4(0x29f)]['messagePositionReset']=function(){const _0x47411a=_0x17a7f4;this[_0x47411a(0x303)]=![],this[_0x47411a(0x164)]=undefined,$gameSystem[_0x47411a(0x25d)](),this[_0x47411a(0x2f3)](),this[_0x47411a(0x182)]=0x0;},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x149)]=function(_0x21ae22){const _0x5dcf2c=_0x17a7f4;return Window_Base[_0x5dcf2c(0x29f)][_0x5dcf2c(0x149)][_0x5dcf2c(0x24f)](this,_0x21ae22);},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x1d2)]=function(_0x38cd68){const _0x11f14f=_0x17a7f4;return Window_Base[_0x11f14f(0x29f)][_0x11f14f(0x1d2)][_0x11f14f(0x24f)](this,_0x38cd68);},Window_Message[_0x17a7f4(0x29f)]['flushTextState']=function(_0x487df3){const _0x262bbb=_0x17a7f4;this[_0x262bbb(0x2db)](_0x487df3),Window_Base['prototype']['flushTextState'][_0x262bbb(0x24f)](this,_0x487df3),this[_0x262bbb(0x145)](_0x487df3);},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x2db)]=function(_0x7f0425){},Window_Message[_0x17a7f4(0x29f)][_0x17a7f4(0x145)]=function(_0x22e447){},Window_NameBox['prototype'][_0x17a7f4(0x120)]=function(){return![];},Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x2b7)]=function(){const _0x30ac96=_0x17a7f4;Window_Base[_0x30ac96(0x29f)][_0x30ac96(0x2b7)]['call'](this),this['changeTextColor'](this[_0x30ac96(0x294)]());},Window_NameBox[_0x17a7f4(0x29f)]['defaultColor']=function(){const _0xd70730=_0x17a7f4,_0x5c0b52=VisuMZ[_0xd70730(0x1ff)][_0xd70730(0x34e)][_0xd70730(0x2ed)]['NameBoxWindowDefaultColor'];return ColorManager['textColor'](_0x5c0b52);},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x2b5)]=Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x260)],Window_NameBox['prototype'][_0x17a7f4(0x260)]=function(){const _0x2b5767=_0x17a7f4;VisuMZ[_0x2b5767(0x1ff)][_0x2b5767(0x2b5)][_0x2b5767(0x24f)](this),this['updateRelativePosition'](),this[_0x2b5767(0x13b)](),this[_0x2b5767(0x30c)](),this[_0x2b5767(0x1f8)]();},Window_NameBox[_0x17a7f4(0x29f)]['preConvertEscapeCharacters']=function(_0x27be77){const _0x24ad72=_0x17a7f4;return _0x27be77=_0x27be77[_0x24ad72(0x36d)](/<LEFT>/gi,this[_0x24ad72(0x301)]['bind'](this,0x0)),_0x27be77=_0x27be77['replace'](/<CENTER>/gi,this['setRelativePosition'][_0x24ad72(0x35a)](this,0x5)),_0x27be77=_0x27be77[_0x24ad72(0x36d)](/<RIGHT>/gi,this[_0x24ad72(0x301)][_0x24ad72(0x35a)](this,0xa)),_0x27be77=_0x27be77[_0x24ad72(0x36d)](/<POSITION:[ ](\d+)>/gi,(_0x9f9b8d,_0x306799)=>this[_0x24ad72(0x301)](parseInt(_0x306799))),_0x27be77=_0x27be77[_0x24ad72(0x36d)](/<\/LEFT>/gi,''),_0x27be77=_0x27be77[_0x24ad72(0x36d)](/<\/CENTER>/gi,''),_0x27be77=_0x27be77[_0x24ad72(0x36d)](/<\/RIGHT>/gi,''),Window_Base[_0x24ad72(0x29f)][_0x24ad72(0x149)]['call'](this,_0x27be77);},Window_NameBox[_0x17a7f4(0x29f)]['setRelativePosition']=function(_0x2dca99){const _0x43805c=_0x17a7f4;return this[_0x43805c(0x297)]=_0x2dca99,'';},Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x1e7)]=function(){const _0x3fa60f=_0x17a7f4;if($gameMessage[_0x3fa60f(0x295)]())return;this['_relativePosition']=this[_0x3fa60f(0x297)]||0x0;const _0x319988=this[_0x3fa60f(0x36a)],_0x95a7c3=Math[_0x3fa60f(0x31d)](_0x319988[_0x3fa60f(0x2d2)]*this[_0x3fa60f(0x297)]/0xa);this['x']=_0x319988['x']+_0x95a7c3-Math['floor'](this[_0x3fa60f(0x2d2)]/0x2),this['x']=this['x'][_0x3fa60f(0x287)](_0x319988['x'],_0x319988['x']+_0x319988[_0x3fa60f(0x2d2)]-this['width']);},Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x13b)]=function(){const _0x562ef3=_0x17a7f4;if($gameMessage[_0x562ef3(0x295)]())return;this[_0x562ef3(0x297)]=this[_0x562ef3(0x297)]||0x0;const _0x4d4c20=VisuMZ[_0x562ef3(0x1ff)]['Settings'][_0x562ef3(0x2ed)][_0x562ef3(0x116)],_0x1e8b82=VisuMZ[_0x562ef3(0x1ff)][_0x562ef3(0x34e)]['General'][_0x562ef3(0x312)],_0x2b545d=(0x5-this[_0x562ef3(0x297)])/0x5;this['x']+=Math[_0x562ef3(0x31d)](_0x4d4c20*_0x2b545d),this['y']+=_0x1e8b82;},Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x1f8)]=function(){const _0x4f3160=_0x17a7f4,_0x5cc6d3=this['_messageWindow'],_0x315111=_0x5cc6d3['y'],_0x51fb48=VisuMZ[_0x4f3160(0x1ff)][_0x4f3160(0x34e)]['General']['NameBoxWindowOffsetY'];_0x315111>this['y']&&_0x315111<this['y']+this['height']-_0x51fb48&&(this['y']=_0x5cc6d3['y']+_0x5cc6d3[_0x4f3160(0x1d9)]);},VisuMZ['MessageCore'][_0x17a7f4(0x1f3)]=Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x28d)],Window_NameBox[_0x17a7f4(0x29f)][_0x17a7f4(0x28d)]=function(){const _0x38878c=_0x17a7f4;this[_0x38878c(0x297)]=0x0,VisuMZ['MessageCore'][_0x38878c(0x1f3)][_0x38878c(0x24f)](this);},Window_ChoiceList['prototype'][_0x17a7f4(0x1c2)]=function(){return![];},Window_ChoiceList[_0x17a7f4(0x29f)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList['prototype'][_0x17a7f4(0x2bd)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList['prototype'][_0x17a7f4(0x13c)]=function(){const _0x5acd70=_0x17a7f4;return $gameSystem[_0x5acd70(0x320)]();},Window_ChoiceList[_0x17a7f4(0x29f)]['start']=function(){const _0x3f961d=_0x17a7f4;this[_0x3f961d(0x28d)](),this[_0x3f961d(0x288)](),this[_0x3f961d(0x2b9)](),this[_0x3f961d(0x18f)]();},Window_ChoiceList[_0x17a7f4(0x29f)]['refresh']=function(){const _0xea6986=_0x17a7f4;this[_0xea6986(0x226)](),this['makeCommandList']();if(this[_0xea6986(0x36a)]){if(_0xea6986(0x373)!==_0xea6986(0x208))this[_0xea6986(0x260)](),this[_0xea6986(0x24b)]();else{function _0x521727(){const _0x3e79e5=_0xea6986;_0x2ceaf4=_0x1f5e92[_0x3e79e5(0x36d)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xfa665e,_0x5cc915)=>{const _0x368ddf=_0x3e79e5;return this[_0x368ddf(0x1c0)](_0x395848,!![],!![]),this['processAutoPosition'](_0x368ddf(0x372),_0x2c8589(_0x5cc915)||0x1),'';}),_0x4a7b01=_0x31ecdc['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5d7671,_0x2c8fbf)=>{const _0x448ae5=_0x3e79e5;return this[_0x448ae5(0x1c0)](_0x59228b,!![],!![]),this[_0x448ae5(0x12d)](_0x448ae5(0x2ce),_0x52a6c8(_0x2c8fbf)||0x0),'';}),_0x457994=_0x2c43d0[_0x3e79e5(0x36d)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x505150,_0x491800)=>{const _0x5a53f6=_0x3e79e5;return this['processAutoSize'](_0x499f4f,!![],!![]),this['processAutoPosition'](_0x5a53f6(0x154),_0x48c1aa(_0x491800)||0x0),'';});}}}this[_0xea6986(0x355)](),this[_0xea6986(0x15e)](),this[_0xea6986(0x1aa)](),Window_Selectable[_0xea6986(0x29f)][_0xea6986(0x28d)][_0xea6986(0x24f)](this);},Window_ChoiceList[_0x17a7f4(0x29f)]['makeCommandList']=function(){const _0x571099=_0x17a7f4,_0x17947c=$gameMessage[_0x571099(0x2ac)]();let _0xe0b67=0x0;for(const _0x331094 of _0x17947c){if(this[_0x571099(0x199)](_0x331094)){if('qmwph'!==_0x571099(0x122)){const _0x4a1ad0=this['parseChoiceText'](_0x331094),_0x216525=this['isChoiceEnabled'](_0x331094);this[_0x571099(0x237)](_0x4a1ad0,_0x571099(0x37d),_0x216525,_0xe0b67);}else{function _0x7ddece(){const _0x4158d8=_0x571099,_0x3c8c50=0x2;switch(this['_moveEasingType']){case 0x0:return _0x3ac34f;case 0x1:return this[_0x4158d8(0x1d1)](_0x1e5162,_0x3c8c50);case 0x2:return this[_0x4158d8(0x16e)](_0x4647ca,_0x3c8c50);case 0x3:return this[_0x4158d8(0x300)](_0x3f2ad3,_0x3c8c50);default:return _0x27dde6[_0x4158d8(0x236)]?_0x1b4507[_0x4158d8(0x1fc)](_0x5b41aa,this['_moveEasingType']):_0x18c5a1;}}}}_0xe0b67++;}},Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x199)]=function(_0x32c728){const _0x2c7e28=_0x17a7f4;if(_0x32c728[_0x2c7e28(0x193)](/<HIDE>/i))return![];if(_0x32c728[_0x2c7e28(0x193)](/<SHOW>/i))return!![];if(_0x32c728[_0x2c7e28(0x193)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2c7e28(0x37f)===_0x2c7e28(0x37f)){const _0x346a02=JSON['parse']('['+RegExp['$1'][_0x2c7e28(0x193)](/\d+/g)+']');for(const _0x2d6f64 of _0x346a02){if(_0x2c7e28(0x1b5)===_0x2c7e28(0x20a)){function _0x433508(){const _0x427e44=_0x2c7e28;return _0x5bbcb6=_0x3a5e5c[_0x427e44(0x36d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x58cc82=_0x1dd408['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x484ff9=_0x26319e[_0x427e44(0x36d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x1e06f8;}}else{if(!$gameSwitches[_0x2c7e28(0x2e2)](_0x2d6f64))return![];}}return!![];}else{function _0xac397d(){const _0x223721=_0x2c7e28;let _0x3b544a=this['y'];_0x472e25['MessageCore'][_0x223721(0x1a7)][_0x223721(0x24f)](this);if(this[_0x223721(0x164)])this['y']=_0x3b544a;this[_0x223721(0x29a)](),this[_0x223721(0x30c)]();}}}if(_0x32c728[_0x2c7e28(0x193)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2c7e28(0x142)!==_0x2c7e28(0x142)){function _0x4651a1(){const _0x7c6548=_0x2c7e28;if(this[_0x7c6548(0x270)]===_0x3f5b4e)this['initMessageCore']();return this[_0x7c6548(0x270)];}}else{const _0x428573=JSON[_0x2c7e28(0x332)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x48d7d1 of _0x428573){if(!$gameSwitches[_0x2c7e28(0x2e2)](_0x48d7d1))return![];}return!![];}}if(_0x32c728['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2c7e28(0x277)!=='DgXhr'){const _0x200f20=JSON['parse']('['+RegExp['$1'][_0x2c7e28(0x193)](/\d+/g)+']');for(const _0x3b54e0 of _0x200f20){if(_0x2c7e28(0x1e5)===_0x2c7e28(0x1e5)){if($gameSwitches[_0x2c7e28(0x2e2)](_0x3b54e0))return!![];}else{function _0x3cb537(){const _0x378317=_0x2c7e28;return this['processAutoSize'](_0x3b4ebb,![],!![]),this[_0x378317(0x12d)]('none'),'';}}}return![];}else{function _0x42c9bd(){const _0x3ba9f6=_0x2c7e28;return _0x57c568=_0x1cf73e[_0x3ba9f6(0x36d)](/\\/g,'\x1b'),_0x1db1f3=_0x338918[_0x3ba9f6(0x36d)](/\x1b\x1b/g,'\x5c'),_0x28d5ac;}}}if(_0x32c728[_0x2c7e28(0x193)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2c7e28(0x2e4)===_0x2c7e28(0x2e4)){const _0x34f9f2=JSON[_0x2c7e28(0x332)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x369bfa of _0x34f9f2){if('JbZcU'!=='JbZcU'){function _0x5f1934(){const _0x514652=_0x2c7e28;return _0x31890c=_0x448616[_0x514652(0x36d)](/<LEFT>/gi,this[_0x514652(0x301)][_0x514652(0x35a)](this,0x0)),_0x5739ff=_0x139f7a[_0x514652(0x36d)](/<CENTER>/gi,this[_0x514652(0x301)][_0x514652(0x35a)](this,0x5)),_0x18600a=_0x32f0f1[_0x514652(0x36d)](/<RIGHT>/gi,this['setRelativePosition']['bind'](this,0xa)),_0x37deea=_0xa14b9b[_0x514652(0x36d)](/<POSITION:[ ](\d+)>/gi,(_0x2984ce,_0x3bf335)=>this[_0x514652(0x301)](_0xecd1d6(_0x3bf335))),_0x3519b5=_0x704a9f['replace'](/<\/LEFT>/gi,''),_0x198678=_0x3d26b8['replace'](/<\/CENTER>/gi,''),_0x5a55f2=_0x5b4ac8['replace'](/<\/RIGHT>/gi,''),_0x17ac55[_0x514652(0x29f)]['preConvertEscapeCharacters'][_0x514652(0x24f)](this,_0x2c4b56);}}else{if(!$gameSwitches['value'](_0x369bfa))return!![];}}return![];}else{function _0xad3fd9(){const _0x4ba644=_0x2c7e28;_0x1aea23['MessageCore'][_0x4ba644(0x1ce)][_0x4ba644(0x24f)](this,_0x3f3c6f);const _0x294037=_0x596782[_0x4ba644(0x1ff)][_0x4ba644(0x34e)]['AutoColor'];_0x5a37e5[_0x4ba644(0x1ff)]['CreateAutoColorFor'](_0x10a26b,_0x294037[_0x4ba644(0x204)]);}}}if(_0x32c728[_0x2c7e28(0x193)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('UcMqi'==='UcMqi'){const _0x48c573=JSON[_0x2c7e28(0x332)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x54233b of _0x48c573){if(!$gameSwitches['value'](_0x54233b))return!![];}return![];}else{function _0x2d4af7(){const _0x41cac9=_0x2c7e28;_0x1b06b6['MessageCore']['Window_Base_processNewLine'][_0x41cac9(0x24f)](this,_0x48d9a2),this[_0x41cac9(0x353)](_0x5aec7d);}}}if(_0x32c728[_0x2c7e28(0x193)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2c7e28(0x268)===_0x2c7e28(0x268)){const _0x527305=JSON[_0x2c7e28(0x332)]('['+RegExp['$1'][_0x2c7e28(0x193)](/\d+/g)+']');for(const _0x5e7f55 of _0x527305){if(_0x2c7e28(0x17e)===_0x2c7e28(0x29c)){function _0xe5cb3a(){const _0xdc47d2=_0x2c7e28;_0x3fb19a[_0xdc47d2(0x198)]=new _0x4d41ea(_0xdc47d2(0x27b)+_0x320087[_0xdc47d2(0x381)]['replace'](/\\/g,'\x1b')+'\x27');}}else{if($gameSwitches[_0x2c7e28(0x2e2)](_0x5e7f55))return![];}}return!![];}else{function _0x23e535(){const _0x111ce5=_0x2c7e28;if(!_0x3e3733[_0x20e791])return;this[_0x111ce5(0x2af)]=this[_0x111ce5(0x2af)]||[];const _0x4476e1=this['_interpreter'][_0x111ce5(0x26b)],_0x59844f=new _0x81ef4c(_0x572acc,_0x4476e1);this[_0x111ce5(0x2af)][_0x111ce5(0x176)](_0x59844f);}}}return!![];},Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x2ad)]=function(_0x2b586a){const _0x2bbab8=_0x17a7f4;let _0x59ce98=_0x2b586a;return _0x59ce98=_0x59ce98[_0x2bbab8(0x36d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x59ce98=_0x59ce98[_0x2bbab8(0x36d)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x59ce98;},Window_ChoiceList['prototype'][_0x17a7f4(0x1a3)]=function(_0x2c708e){const _0x15290c=_0x17a7f4;if(_0x2c708e[_0x15290c(0x193)](/<DISABLE>/i))return![];if(_0x2c708e['match'](/<ENABLE>/i))return!![];if(_0x2c708e[_0x15290c(0x193)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd59bad=JSON[_0x15290c(0x332)]('['+RegExp['$1'][_0x15290c(0x193)](/\d+/g)+']');for(const _0xef41ee of _0xd59bad){if(!$gameSwitches['value'](_0xef41ee))return![];}return!![];}if(_0x2c708e[_0x15290c(0x193)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16cc96=JSON[_0x15290c(0x332)]('['+RegExp['$1'][_0x15290c(0x193)](/\d+/g)+']');for(const _0x18e611 of _0x16cc96){if(!$gameSwitches[_0x15290c(0x2e2)](_0x18e611))return![];}return!![];}if(_0x2c708e[_0x15290c(0x193)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xeb2843=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x121887 of _0xeb2843){if($gameSwitches[_0x15290c(0x2e2)](_0x121887))return!![];}return![];}if(_0x2c708e[_0x15290c(0x193)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('EbAjl'!==_0x15290c(0x2de)){function _0x1f3ffa(){const _0x542848=_0x15290c;_0x3f5750=_0xb9db91[_0x542848(0x36d)](_0x363e5d['textCodeCheck'],_0x4b37f9[_0x542848(0x198)][_0x542848(0x35a)](this)),_0x47f96a=this[_0x542848(0x341)](_0xf2cf7e);}}else{const _0x51344e=JSON[_0x15290c(0x332)]('['+RegExp['$1'][_0x15290c(0x193)](/\d+/g)+']');for(const _0x4a16fe of _0x51344e){if(!$gameSwitches['value'](_0x4a16fe))return!![];}return![];}}if(_0x2c708e[_0x15290c(0x193)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f6a7d=JSON[_0x15290c(0x332)]('['+RegExp['$1'][_0x15290c(0x193)](/\d+/g)+']');for(const _0x18d6c7 of _0x4f6a7d){if(!$gameSwitches[_0x15290c(0x2e2)](_0x18d6c7))return!![];}return![];}if(_0x2c708e['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x413cb1=JSON[_0x15290c(0x332)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4baa6f of _0x413cb1){if($gameSwitches[_0x15290c(0x2e2)](_0x4baa6f))return![];}return!![];}return!![];},VisuMZ['MessageCore'][_0x17a7f4(0x2e0)]=Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x260)],Window_ChoiceList['prototype'][_0x17a7f4(0x260)]=function(){const _0x367e04=_0x17a7f4;VisuMZ[_0x367e04(0x1ff)]['Window_ChoiceList_updatePlacement'][_0x367e04(0x24f)](this),this[_0x367e04(0x30c)]();},Window_ChoiceList[_0x17a7f4(0x29f)]['placeCancelButton']=function(){const _0x5f1e59=_0x17a7f4;if(!this[_0x5f1e59(0x184)])return;const _0x5a4a5c=0x8,_0x4b2df7=this['_cancelButton'],_0x28edb0=this['x']+this[_0x5f1e59(0x2d2)],_0x363f30=Math[_0x5f1e59(0x31d)]((Graphics['width']-Graphics[_0x5f1e59(0x26e)])/0x2);if(_0x28edb0>=Graphics['boxWidth']+_0x363f30-_0x4b2df7['width']+_0x5a4a5c)_0x4b2df7['x']=-_0x4b2df7['width']-_0x5a4a5c;else{if('NsQiw'===_0x5f1e59(0x348)){function _0x2a4e94(){const _0x4ebf81=_0x5f1e59;_0x4dabc7['MessageCore']['Window_Options_addGeneralOptions']['call'](this),this[_0x4ebf81(0x24c)]();}}else _0x4b2df7['x']=this[_0x5f1e59(0x2d2)]+_0x5a4a5c;}_0x4b2df7['y']=this[_0x5f1e59(0x1d9)]/0x2-_0x4b2df7['height']/0x2;},VisuMZ[_0x17a7f4(0x1ff)][_0x17a7f4(0x1fe)]=Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x2bc)],Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x2bc)]=function(){const _0x38e0a0=_0x17a7f4;return this[_0x38e0a0(0x36a)]?this[_0x38e0a0(0x28c)]():VisuMZ[_0x38e0a0(0x1ff)][_0x38e0a0(0x1fe)][_0x38e0a0(0x24f)](this);},Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x28c)]=function(){const _0x1180ed=_0x17a7f4,_0x49ea67=$gameMessage['choicePositionType']();if(_0x49ea67===0x1){if(_0x1180ed(0x2b2)!=='TxkUg')return(Graphics[_0x1180ed(0x26e)]-this[_0x1180ed(0x33e)]())/0x2;else{function _0x65a918(){const _0x210661=_0x1180ed,_0x8d3284=-(_0x593b87['floor'](_0x2774d1[_0x210661(0x2d2)]-_0x5da2eb[_0x210661(0x26e)])/0x2),_0x4df3a5=_0x8d3284+_0x3b6920[_0x210661(0x2d2)]-this[_0x210661(0x2d2)],_0xabd4fc=-(_0x1627df['floor'](_0x20db29[_0x210661(0x1d9)]-_0x178cb3[_0x210661(0x383)])/0x2),_0x14c5ac=_0xabd4fc+_0x1fd32b[_0x210661(0x1d9)]-this[_0x210661(0x1d9)];this['x']=this['x'][_0x210661(0x287)](_0x8d3284,_0x4df3a5),this['y']=this['y'][_0x210661(0x287)](_0xabd4fc,_0x14c5ac);}}}else{if(_0x49ea67===0x2)return this[_0x1180ed(0x36a)]['x']+this[_0x1180ed(0x36a)]['width']-this['windowWidth']();else{if(_0x1180ed(0x26c)===_0x1180ed(0x1d8)){function _0x5999d0(){const _0x3ce3a5=_0x1180ed,_0x4208fa=_0x4c465a[_0x3ce3a5(0x1c5)](',')[_0x3ce3a5(0x34f)](_0x1acff7=>_0x3e4fca(_0x1acff7)||0x0);if(_0x4208fa[0x0]!==_0x1849f7)this[_0x3ce3a5(0x1df)][_0x3ce3a5(0x2d2)]=_0x5c2282(_0x4208fa[0x2]);if(_0x4208fa[0x1]!==_0x303a9b)this[_0x3ce3a5(0x1df)][_0x3ce3a5(0x1d9)]=_0x156dfb(_0x4208fa[0x3]);return'';}}else return this[_0x1180ed(0x36a)]['x'];}}},Window_ChoiceList['prototype'][_0x17a7f4(0x33e)]=function(){const _0x46de5d=_0x17a7f4,_0x109258=(this[_0x46de5d(0x32e)]()+this['colSpacing']())*this[_0x46de5d(0x13c)]()+this[_0x46de5d(0x18c)]*0x2;return Math[_0x46de5d(0x15c)](_0x109258,Graphics[_0x46de5d(0x2d2)]);},Window_ChoiceList[_0x17a7f4(0x29f)]['numVisibleRows']=function(){const _0x49c837=_0x17a7f4,_0x299bf4=$gameMessage['choices']()['filter'](_0x5cb6de=>this[_0x49c837(0x199)](_0x5cb6de)),_0x4311c6=Math[_0x49c837(0x357)](_0x299bf4[_0x49c837(0x194)]/this[_0x49c837(0x13c)]());return Math[_0x49c837(0x368)](0x1,Math['min'](_0x4311c6,this[_0x49c837(0x18e)]()));},Window_ChoiceList['prototype'][_0x17a7f4(0x18e)]=function(){const _0x70f03b=_0x17a7f4,_0x197831=this[_0x70f03b(0x36a)],_0x31b02a=_0x197831?_0x197831['y']:0x0,_0x23c99a=_0x197831?_0x197831[_0x70f03b(0x1d9)]:0x0,_0x21bc6c=Graphics['boxHeight']/0x2;if(_0x31b02a<_0x21bc6c&&_0x31b02a+_0x23c99a>_0x21bc6c)return 0x4;else{if(_0x70f03b(0x2bb)!=='zbDOt'){function _0x27c089(){const _0x5160f1=_0x70f03b;return this[_0x5160f1(0x1c0)](_0x3ba54f,!![],!![]),this[_0x5160f1(0x12d)](_0x5160f1(0x372),_0x484276(_0x309e31)||0x1),'';}}else return $gameSystem[_0x70f03b(0x1f1)]();}},Window_ChoiceList[_0x17a7f4(0x29f)]['maxChoiceWidth']=function(){const _0x56ddad=_0x17a7f4;let _0x4d8774=0x60;for(const _0xcdb27e of this[_0x56ddad(0x38a)]){if('vVUiU'!==_0x56ddad(0x356)){function _0x37aa72(){const _0x415a30=_0x56ddad;this[_0x415a30(0x303)]=![],this['_autoPositionTarget']=_0x2219eb,_0x5f4f60[_0x415a30(0x25d)](),this['updateAutoSizePosition'](),this[_0x415a30(0x182)]=0x0;}}else{const _0x346c3f=_0xcdb27e['name'],_0x45e170=this[_0x56ddad(0x284)](_0x346c3f)[_0x56ddad(0x2d2)],_0x460fe5=Math[_0x56ddad(0x357)](_0x45e170)+this[_0x56ddad(0x30b)]()*0x2;if(_0x4d8774<_0x460fe5){if(_0x56ddad(0x14e)===_0x56ddad(0x2ca)){function _0x1f40bb(){const _0x33e5db=_0x56ddad;return this[_0x33e5db(0x36a)]['x']+this[_0x33e5db(0x36a)][_0x33e5db(0x2d2)]-this[_0x33e5db(0x33e)]();}}else _0x4d8774=_0x460fe5;}}}return _0x4d8774;},Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x2f9)]=function(_0x3204b0){const _0x5e2b92=_0x17a7f4,_0x47a00b=this[_0x5e2b92(0x1ad)](_0x3204b0),_0x5c7760=$gameSystem['getChoiceListTextAlign']()!==_0x5e2b92(0x2f0)?_0x5e2b92(0x189)['format']($gameSystem[_0x5e2b92(0x28a)]()):'',_0x435f71=_0x5c7760+this[_0x5e2b92(0x33c)](_0x3204b0);this['changePaintOpacity'](this[_0x5e2b92(0x2e1)](_0x3204b0));const _0x3dbca2=this['textSizeEx'](_0x435f71)[_0x5e2b92(0x1d9)],_0x4de762=Math[_0x5e2b92(0x368)](_0x47a00b['y'],_0x47a00b['y']+Math[_0x5e2b92(0x2e9)]((_0x47a00b[_0x5e2b92(0x1d9)]-_0x3dbca2)/0x2));this[_0x5e2b92(0x19c)](_0x435f71,_0x47a00b['x'],_0x4de762,_0x47a00b[_0x5e2b92(0x2d2)]);},Window_ChoiceList[_0x17a7f4(0x29f)][_0x17a7f4(0x124)]=function(){const _0x5f23bb=_0x17a7f4;$gameMessage[_0x5f23bb(0x2a0)](this[_0x5f23bb(0x257)]()),this['_messageWindow'][_0x5f23bb(0x188)](),this['close']();};