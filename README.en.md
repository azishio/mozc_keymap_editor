[日本語](README.md) | English

# Mozc Keymap Editor
　This is a tool for effortlessly editing Mozc keymap configuration files.
In addition to creating new configuration files, you can read and edit existing configuration files or merge multiple configuration files.

![Mozc Keymap Editor](https://github.com/azishio/mozc_keymap_editor/assets/127939746/6ca19970-a16e-47e1-9c88-6506810956ae)

## How to use
　The software is available on GitHub Pages and can be used at the following URL
https://azishio.github.io/mozc_keymap_editor/

## What you can do.
+ Edit keymaps using the GUI.
  + Set keys and commands for multiple modes at once.
+ Integrate multiple configuration files.
  + Merge configuration files by selecting files from the "Merge" button.
  + Add a mode for a line where an identical input key/command pair already exists.
  + If no input key/command pair exists, add a new line.
+ Sort settings.
  + Drag-and-drop to reorder settings.
+ Conflicting settings warning
  + Displays a warning if a setting has a duplicate mode and input key.
+ Download configuration files.
  + Download edited settings files from the "Download" button.
  + You can also copy it to the clipboard.

## What you cannot do.
+ Check input keys for correctness.
  + The correctness of key names is not verified.
    + For example, if the key name in the loaded configuration file is "Hoge", it will be displayed as "Hoge" in the UI and no warning will be shown.
    + You can set any key, regardless of whether it is supported by Mozc.
  + The user must check if the key is supported by Mozc.
    + No warning will be displayed if a key is set for a key that is not supported by Mozc.

## About input keys
　Input keys are obtained by reading [the value of key in the keyboard event](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).
Since some of the key names are different from those used in the Mozc configuration file, they will not work properly without modification.

　Below is a table of key name correspondence as recognized by the developer. Key names not in this table are not automatically replaced in the program.
If you notice a key name that is not supported by this program, we would appreciate it if you could raise an Issue.

| keyboard event key value | Mozc key name |
|--------------------------|----------|
| `Control`                | `Ctrl`   |
| `ArrowUp`                | `Up`     |
| `ArrowDown`              | `Down`   |
| `ArrowLeft`              | `Left`   |
| `ArrowRight`             | `Right`  |
| ` ` (space)              | `Space`  |
| `[A-Z]` (alphabet)       | `[a-z]`  |


In addition, only `meta`, `ctrl`, `alt`, and `shift` are displayed as combination keys in this program. All other keys are displayed with their names as they are.
If you know that Mozc supports other combination keys, please let us know in an Issue.

## UI details

### Edit Tab
Edit the keymap from the UI on the keymap table.

#### "\#"
Row number. If there is a conflict with another row setting (mode and input key are the same), a warning will be displayed.
#### mode
Specifies the mode to which this setting is applied.
Multiple modes can be specified.
#### Input Key
Specifies the key that accepts input from the keyboard.
When this key is pressed, the command is executed.

If the browser or IME has already reserved a combination of a combination key and a normal key, you cannot enter that key at once.
In that case, turn on the "Keep Combination Key" switch. Turning this switch on will hold the combination key input.
This allows you to enter the combination key and the normal key separately.
#### command
Specifies the command to be executed when the input key is pressed.
Commands are grouped by category.
#### "-" button
Deletes this line.
#### "+" button
Adds a new line.

### Output tab
Displays the contents of the configuration file generated from the keymap settings edited in the Edit tab.
Settings cannot be rewritten from here.

### Buttons
#### New
Loads a configuration file from local and displays its contents. If settings already exist in the keymap table, they will be deleted.
#### Add
Reads a configuration file from local and adds its contents to the keymap table.
If there are settings with the same input keys and commands but different modes, they are merged.
#### delete all
Deletes all contents of the keymap table.
#### Copy to Clipboard
Copies the contents of the output tab to the clipboard.
#### Download
Download the contents of the output tab as a file (`keymap.txt`).

## License
This program is released under the MIT License.


(Translation by deepL)
