(() => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    let userInteracted = false;
    const markInteracted = () => {
        userInteracted = true;
    };
    ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach((eventName) => {
        window.addEventListener(eventName, markInteracted, { passive: true });
    });
    const forceTop = () => {
        if (userInteracted || window.location.hash) return;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };
    window.addEventListener('load', () => {
        forceTop();
        setTimeout(forceTop, 180);
    });
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            forceTop();
        }
    });

    const DECISION_TREE = {
        id: 'root',
        title: 'What do you need to fix?',
        summary: 'Pick a category to get simple step-by-step help.',
        response: `Pick the area that matches your problem. Each branch gives simple steps plus official help links you can use later.`,
        tags: [],
        children: [
            {
                id: 'microsoft_windows',
                title: 'Microsoft - Windows',
                summary: 'Password resets, update loops, Teams calls.',
                response: `Use this for Windows PCs, Microsoft accounts, or Teams meetings. Tip: click Start and type what you need. Open Settings (the gear). Press Windows + A to open quick settings for Wi-Fi and Bluetooth. Right-click Start to find Power and other tools.`,
                tags: ['windows', 'office'],
                children: [
                    {
                        id: 'windows_power_boot',
                        title: 'Power & boot issues',
                        summary: 'Device will not start, batteries misbehave, or displays stay dark.',
                        response: `Pick the problem that looks most like yours.`,
                        tags: ['power', 'boot'],
                        children: [
                            {
                                id: 'computer_wont_turn_on',
                                title: 'Computer will not power on',
                                summary: 'No lights, no fans, totally dead.',
                                response: `1. Unplug everything extra, hold the power button for 15 seconds, then plug the charger straight into the wall.
2. Check for any charging light or laptop lights. Try a different outlet or charger if nothing lights up. Reseat the battery if it is removable.
3. Hold the power button for about 20 seconds to force a reset, then try turning it on again.
4. If you hear fans but see a black screen, try an external monitor or shine a flashlight on the screen to see a faint image.
5. Write down any beeps or blinking lights before you contact support.`,
                        tags: ['power', 'hardware'],
                        links: [
                            { label: "HP Support - PC won't start", url: 'https://support.hp.com/us-en/document/c00006110' },
                            { label: 'Microsoft help video', url: 'https://www.youtube.com/watch?v=J3LJkSgEBrw' },
                            { label: "Short demo: laptop won't turn on", url: 'https://youtube.com/shorts/oy--tpvsO7M' },
                        ],
                            },
                            {
                                id: 'battery_not_charging',
                                title: 'Battery not charging',
                                summary: '"Plugged in, not charging" or blinking battery light.',
                                response: `1. Use the original charger if you can. Check the cable and charging port for damage and gently remove lint with a wooden toothpick.
2. Search Start for "Device Manager." Under Batteries, right-click the battery entry and choose Uninstall, then restart the PC so Windows adds it back.
3. Use the maker's update app (Lenovo Vantage, Dell Command, HP Support Assistant) to install device updates while plugged in.
4. If it only charges when the laptop is off, the charger may be too weak or the battery may be worn out.`,
                                tags: ['battery', 'charger'],
                                links: [
                                    { label: 'Dell Support video', url: 'https://www.youtube.com/watch?v=bwjcYyCneNc' },
                                ],
                            },
                           {
                               id: 'windows_update_refresh',
                               title: 'Run Windows Update',
                               summary: 'Cycle updates after a repair.',
                                response: `1. Open Settings, go to Windows Update, and click "Check for updates." Keep the PC plugged in.
2. Install everything, restart, then check again.
3. If updates keep failing, run the Windows Update troubleshooter (Settings > System > Troubleshoot > Other troubleshooters) and try again.`,
                                tags: ['updates'],
                                links: [
                                    { label: 'Microsoft support article', url: 'https://support.microsoft.com/search?query=Microsoft%20support%20article%20Windows' },
                                    { label: 'Microsoft update fix video', url: 'https://www.youtube.com/watch?v=udsJGOEEjAQ' },
                                    { label: 'Short demo: run Windows Update', url: 'https://youtube.com/shorts/LD-o5PaWIk0?feature=share' },
                                ],
                            },
                            {
                                id: 'onedrive_relink',
                                title: 'Sign out/in of OneDrive',
                                summary: 'Sync stuck or signing in under the wrong account.',
                                response: `1. Click the OneDrive cloud icon, open Settings, and choose "Unlink this PC."
2. Open OneDrive again, sign in with the correct account, and pick the folders you want on this PC.
3. Turn on Files On-Demand if you want to save space, or keep files downloaded if you need them offline.`,
                                tags: ['onedrive', 'sync'],
                                links: [
                                    { label: 'OneDrive sync troubleshooting', url: 'https://support.microsoft.com/search?query=OneDrive%20sync%20troubleshooting%20Windows' },
                                ],
                            },
                            {
                                id: 'black_screen',
                                title: 'Black screen / no display',
                                summary: 'Fans spin but nothing shows.',
                                response: `1. Check the monitor power, input setting, and cable. Try another cable or port.
2. Desktop: try the built-in video port if your PC has one, or reseat the video cable and memory if you are comfortable.
3. Laptop: shine a flashlight on the screen. If you see a faint image, the screen backlight may be out.
4. Write down any beeps or blinking lights before contacting support.`,
                                tags: ['display', 'hardware'],
                                links: [
                                    { label: 'Dell Support: no display', url: 'https://www.youtube.com/watch?v=Uhje3vFqlbo' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'performance_speed',
                        title: 'Performance & speed',
                        summary: 'Laptops feel slow, freeze, or run hot.',
                        response: `Pick the problem that sounds like yours.`,
                        tags: ['performance'],
                        children: [
                            {
                                id: 'slow_computer',
                                title: 'Slow computer',
                                summary: 'General lag after updates or over time.',
                                response: `1. Press Ctrl + Shift + Esc to open Task Manager. Sort by CPU or Memory and close apps you do not need.
2. Open Settings > System > Storage and run the cleanup suggestions.
3. Turn off startup apps you do not use and uninstall apps you no longer need.`,
                                tags: ['performance'],
                                links: [
                                    { label: 'Microsoft: Improve PC performance', url: 'https://support.microsoft.com/search?query=Improve%20PC%20performance%20Windows' },
                                ],
                            },
                            {
                                id: 'freezing_lag',
                                title: 'Freezing / lagging',
                                summary: 'System hangs or apps stop responding.',
                                response: `1. Search Start for "Windows Memory Diagnostic" and run the test.
2. Install updates from Windows Update and your PC maker, then restart.
3. If one app keeps crashing, uninstall it and install it again.`,
                                tags: ['stability'],
                                links: [
                                    { label: 'Microsoft: Fix freezes', url: 'https://support.microsoft.com/search?query=Fix%20freezes%20Windows' },
                                ],
                            },
                            {
                                id: 'overheating',
                                title: 'Overheating',
                                summary: 'Fans race, chassis feels hot.',
                                response: `1. Turn the laptop off and blow dust out of the vents. Use a hard surface or a cooling pad.
2. Use the maker's app to switch to a Balanced or Quiet mode.
3. Install system updates. If it still runs very hot, it may need a cleaning service.`,
                                tags: ['thermal'],
                                links: [
                                    { label: 'HP Support: Laptop overheating', url: 'https://support.hp.com/us-en/document/c01657439' },
                                ],
                            },
                            {
                                id: 'battery_drains_fast',
                                title: 'Battery drains fast',
                                summary: 'Laptop will not last long unplugged.',
                                response: `1. Turn on Battery Saver and lower the screen brightness.
2. Close apps you are not using and turn off extra startup apps.
3. Use the maker's battery health tool to check if the battery is worn out.`,
                                tags: ['battery'],
                                links: [
                                    { label: 'Microsoft: Save battery life', url: 'https://support.microsoft.com/search?query=Save%20battery%20life%20Windows' },
                                ],
                            },
                            {
                                id: 'fans_loud_constant',
                                title: 'Fans always loud',
                                summary: 'System sounds busy even when idle.',
                                response: `1. Open Task Manager and close apps using a lot of CPU.
2. Switch to Balanced or Quiet power mode.
3. Clean vents and keep the laptop on a hard surface so air can flow.`,
                                tags: ['fans', 'thermal'],
                                links: [
                                    { label: 'Dell: Reduce fan noise', url: 'https://www.dell.com/support/kbdoc/en-us/000132421/fan-noise-is-loud' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'connectivity_network',
                        title: 'Wi-Fi & network',
                        summary: 'Stay online at home or on the go.',
                        response: `Quick Wi-Fi help: 1) Press Windows + A and turn Wi-Fi or Airplane mode off and on. 2) Forget and rejoin the network in Settings > Network & internet > Wi-Fi. 3) Restart your router and PC and stand close to the router.`,
                        tags: ['network', 'wifi'],
                        children: [
                            {
                                id: 'wifi_cant_connect',
                                title: 'Wi-Fi will not connect',
                                summary: 'Password ok but Windows refuses to join.',
                                response: `1. Turn Airplane mode on, then off, and restart the PC.
2. Forget the network in Settings > Network & internet > Wi-Fi > Manage known networks, then rejoin with the password.
3. Restart the router/modem and make sure the network name is showing up.`,
                                tags: ['wifi'],
                                links: [
                                    { label: 'Microsoft: Fix Wi-Fi connection issues', url: 'https://support.microsoft.com/search?query=Fix%20Wi-Fi%20connection%20issues%20Windows' },
                                ],
                            },
                            {
                                id: 'wifi_drops_frequently',
                                title: 'Wi-Fi keeps dropping',
                                summary: 'Connection cuts out every few minutes.',
                                response: `1. Move closer to the router and avoid thick walls or microwaves.
2. Search Start for "Device Manager," open Network adapters, and update the Wi-Fi device, then restart.
3. Restart the router. If many devices drop, split the 2.4 GHz and 5 GHz networks if your router allows it.`,
                                tags: ['wifi'],
                                links: [
                                    { label: 'Microsoft: Fix network connection issues', url: 'https://support.microsoft.com/search?query=Fix%20network%20connection%20issues%20Windows' },
                                ],
                            },
                            {
                                id: 'ethernet_not_working',
                                title: 'Ethernet not working',
                                summary: 'Cable plugged in but no internet.',
                                response: `1. Try another Ethernet cable and a different port on the router.
2. In Settings > Network & internet > Advanced network settings, disable then enable the Ethernet connection.
3. Install network updates from your PC maker and restart.`,
                                tags: ['network'],
                                links: [
                                    { label: 'Microsoft: Fix Ethernet problems', url: 'https://support.microsoft.com/search?query=Fix%20Ethernet%20problems%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'input_devices',
                        title: 'Mouse, keyboard, touchpad',
                        summary: 'When basic input quits.',
                        response: `Fix mouse, keyboard, or touchpad issues.`,
                        tags: ['input'],
                        children: [
                            {
                                id: 'mouse_keyboard_not_working',
                                title: 'Mouse or keyboard stops responding',
                                summary: 'Either wired or wireless.',
                                response: `1. Replug the USB receiver/cable or replace the batteries.
2. Try a different USB port and restart the PC.
3. Search Start for "Device Manager," uninstall the mouse/keyboard, then restart to let Windows add it back.`,
                                tags: ['input'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot keyboard and mouse', url: 'https://support.microsoft.com/search?query=Troubleshoot%20keyboard%20and%20mouse%20Windows' },
                                ],
                            },
                            {
                                id: 'touchpad_not_working',
                                title: 'Touchpad not working',
                                summary: 'Cursor frozen on laptops.',
                                response: `1. Press the touchpad on/off key on your keyboard (often Fn + F6/F7).
2. Go to Settings > Bluetooth & devices > Touchpad and turn it off and on.
3. Use the laptop maker's update app to install touchpad updates.`,
                                tags: ['touchpad'],
                                links: [
                                    { label: 'Microsoft: Fix touchpad problems', url: 'https://support.microsoft.com/search?query=Fix%20touchpad%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'sticky_keys_stuck',
                                title: 'Sticky Keys stuck on',
                                summary: 'Popup keeps appearing or keys act odd.',
                                response: `1. Press Shift five times to turn Sticky Keys off.
2. Go to Settings > Accessibility > Keyboard and turn off Sticky, Filter, and Toggle Keys.
3. Restart the PC if it still acts stuck.`,
                                tags: ['accessibility'],
                                links: [
                                    { label: 'Microsoft: Turn off Sticky Keys', url: 'https://support.microsoft.com/search?query=Turn%20off%20Sticky%20Keys%20Windows' },
                                ],
                            },
                            {
                                id: 'usb_drive_not_opening',
                                title: 'USB drive will not open',
                                summary: 'Drive letter missing or access denied.',
                                response: `1. Try another USB port and another computer to confirm the drive works.
2. Search Start for "Disk Management" and assign a drive letter if needed.
3. In File Explorer, right-click the drive > Properties > Tools > Error checking.`,
                                tags: ['usb'],
                                links: [
                                    { label: "Microsoft: Windows can't find USB device", url: 'https://support.microsoft.com/windows/what-to-do-if-windows-11-or-windows-10-can-t-find-a-usb-device-ceddd7a6-1ef0-adaa-0f19-013ba6c2b4cf' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'bluetooth_audio_devices',
                        title: 'Bluetooth & audio gear',
                        summary: 'Pairing issues or audio lag.',
                        response: `Get Bluetooth and audio working for headphones and speakers.`,
                        tags: ['bluetooth', 'audio'],
                        children: [
                            {
                                id: 'bluetooth_not_pairing_simple',
                                title: 'Bluetooth will not pair',
                                summary: 'Devices cannot find each other.',
                                response: `1. Press Windows + A and turn Bluetooth off and on on both devices.
2. Go to Settings > Bluetooth & devices, remove the device, then add it again. Put the accessory in pairing mode.
3. Keep devices within about 3 feet and away from interference; turn off extra Bluetooth devices nearby.
4. Install Bluetooth updates from your PC maker and restart.`,
                                tags: ['bluetooth'],
                                links: [
                                    { label: 'Microsoft: Bluetooth help', url: 'https://support.microsoft.com/search?query=Bluetooth%20help%20Windows' },
                                ],
                            },
                            {
                                id: 'headphones_not_recognized',
                                title: 'Headphones not recognized',
                                summary: 'Plugged in but no audio.',
                                response: `1. Plug in the headset firmly, then click the speaker icon and choose the headset as the output.
2. Go to Settings > System > Sound > More sound settings, select your headset, and turn off sound enhancements.
3. For USB headsets: search Start for "Device Manager," uninstall the headset, then unplug and plug it back in.`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Fix sound problems', url: 'https://support.microsoft.com/search?query=Fix%20sound%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'bluetooth_audio_lag',
                                title: 'Bluetooth audio lag',
                                summary: 'Sound delayed behind video.',
                                response: `1. Disconnect and reconnect the headset. Keep only one headset paired at a time.
2. Go to Settings > Bluetooth & devices, open the headset settings, and turn off "Hands-Free" mode if you see it.
3. Install Bluetooth and audio updates from your PC maker, then restart.`,
                                tags: ['bluetooth', 'audio'],
                                links: [
                                    { label: 'Microsoft: Bluetooth audio help', url: 'https://support.microsoft.com/search?query=Bluetooth%20audio%20help%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'sound_voice',
                        title: 'Sound & microphone',
                        summary: 'Pick the right speakers or mic.',
                        response: `Make sure sound and mic use the right device.`,
                        tags: ['audio'],
                        children: [
                            {
                                id: 'audio_wrong_device',
                                title: 'Audio plays through wrong device',
                                summary: 'Sound comes from the monitor or nowhere.',
                                response: `1. Click the speaker icon and choose the correct output.
2. Go to Settings > System > Sound and set the default speaker.
3. Unplug and plug back in HDMI or USB audio devices.`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Choose sound output', url: 'https://support.microsoft.com/search?query=Choose%20sound%20output%20Windows' },
                                ],
                            },
                            {
                                id: 'no_sound_windows',
                                title: 'No sound at all',
                                summary: 'Windows is completely silent.',
                                response: `1. Check mute keys and the volume slider.
2. Run the Playing Audio troubleshooter in Settings > System > Troubleshoot.
3. Install audio updates from your PC maker and restart.`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Fix sound problems', url: 'https://support.microsoft.com/search?query=Fix%20sound%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'microphone_not_working_simple',
                                title: 'Microphone not working',
                                summary: 'Apps cannot hear you.',
                                response: `1. Go to Settings > Privacy & security > Microphone and allow apps to use it.
2. In Settings > System > Sound, choose the correct input device.
3. If you see an "Exclusive mode" option, turn it off and restart the app.`,
                                tags: ['microphone'],
                                links: [
                                    { label: 'Microsoft: Fix microphone problems', url: 'https://support.microsoft.com/search?query=Fix%20microphone%20problems%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'camera_printer_usb',
                        title: 'Camera, printers, sharing',
                        summary: 'Peripherals that refuse to cooperate.',
                        response: `Fix common camera, printer, and sharing problems.`,
                        tags: ['peripherals'],
                        children: [
                            {
                                id: 'webcam_not_detected_simple',
                                title: 'Webcam not detected',
                                summary: 'Missing in Teams/Zoom.',
                                response: `1. Close other apps that might be using the camera, then reopen your meeting app.
2. Go to Settings > Privacy & security > Camera and allow apps to use it.
3. Install camera updates from your laptop maker.`,
                                tags: ['camera'],
                                links: [
                                    { label: 'Microsoft: Fix camera issues', url: 'https://support.microsoft.com/search?query=Fix%20camera%20issues%20Windows' },
                                    { label: 'Short demo: laptop camera not working', url: 'https://youtube.com/shorts/UetjQYD5b4M?feature=share' },
                                ],
                            },
                            {
                                id: 'printer_offline_simple',
                                title: 'Printer offline',
                                summary: 'Jobs stuck in queue.',
                                response: `1. Turn the printer and PC off and on, and make sure both are on the same Wi-Fi.
2. Go to Settings > Bluetooth & devices > Printers, set the printer as default, and clear the queue.
3. Reinstall the printer using the maker's app (HP Smart, Epson, Canon).`,
                                tags: ['printer'],
                                links: [
                                    { label: 'Microsoft: Fix printer problems', url: 'https://support.microsoft.com/search?query=Fix%20printer%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'password_prompt_loop',
                                title: 'Password prompt loop when printing/sharing',
                                summary: 'Windows keeps asking for credentials.',
                                response: `1. Search Start for "Credential Manager" and remove saved entries for the printer or share.
2. Add the printer again in Settings > Bluetooth & devices > Printers & scanners with the correct username and password.
3. Restart the PC. If it still asks every time, ask for help to reset the Windows printer service.`,
                                tags: ['printer'],
                                links: [
                                    { label: 'Microsoft: Printer connection troubleshooting', url: 'https://support.microsoft.com/search?query=Printer%20connection%20troubleshooting%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'display_personalization',
                        title: 'Display & personalization',
                        summary: 'Brightness, wallpaper, and screen behavior.',
                        response: `Fix brightness, screens, and wallpaper.`,
                        tags: ['display'],
                        children: [
                            {
                                id: 'auto_brightness_annoying',
                                title: 'Auto brightness too aggressive',
                                summary: 'Screen constantly dims.',
                                response: `1. Go to Settings > System > Display and turn off "Change brightness automatically."
2. Install updates from your PC maker and restart.
3. Check the maker's app for an "adaptive brightness" setting and turn it off.`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Change screen brightness', url: 'https://support.microsoft.com/search?query=Change%20screen%20brightness%20Windows' },
                                ],
                            },
                            {
                                id: 'external_monitor_missing',
                                title: 'External monitor not detected',
                                summary: 'Second screen stays blank.',
                                response: `1. Press Windows + P and pick Duplicate or Extend.
2. Unplug and replug the cable, then power the monitor off and on.
3. Install updates from your PC maker and restart.`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Fix connections to external displays', url: 'https://support.microsoft.com/search?query=Fix%20connections%20to%20external%20displays%20Windows' },
                                ],
                            },
                            {
                                id: 'screen_rotation_stuck',
                                title: 'Screen rotation stuck',
                                summary: 'Tablet mode locked at wrong angle.',
                                response: `1. Turn Rotation Lock off in Quick Settings.
2. Restart the PC or detach and reattach the keyboard on 2-in-1s.
3. Install updates from the device maker.`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Rotate the screen', url: 'https://support.microsoft.com/search?query=Rotate%20the%20screen%20Windows' },
                                ],
                            },
                            {
                                id: 'night_light_not_working',
                                title: 'Night light not working',
                                summary: 'Blue light filter never turns on.',
                                response: `1. Turn Night light off and on and adjust the strength slider.
2. Turn off any color-changing apps temporarily.
3. Install updates and restart.`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Use Night light', url: 'https://support.microsoft.com/search?query=Use%20Night%20light%20Windows' },
                                ],
                            },
                            {
                                id: 'screensaver_wont_turn_off',
                                title: 'Screensaver will not turn off',
                                summary: 'Kicks in while you are active.',
                                response: `1. Go to Settings > Personalization > Lock screen > Screen saver and set it to None or increase the time.
2. Check for stuck keys or game controllers.
3. Restart the PC if the screen keeps blanking.`,
                                tags: ['personalization'],
                                links: [
                                    { label: 'Microsoft: Change screen saver', url: 'https://support.microsoft.com/search?query=Change%20screen%20saver%20Windows' },
                                ],
                            },
                            {
                                id: 'cant_change_wallpaper',
                                title: 'Cannot change wallpaper',
                                summary: 'Options greyed out.',
                                response: `1. Check Settings > System > Activation to make sure Windows is activated.
2. Go to Settings > Personalization > Background and choose a picture.
3. If this is a work or school PC, your admin may have locked this setting.`,
                                tags: ['personalization'],
                                links: [
                                    { label: 'Microsoft: Change desktop background', url: 'https://support.microsoft.com/search?query=Change%20desktop%20background%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'storage_files',
                        title: 'Storage & file handling',
                        summary: 'Clear space and open files properly.',
                        response: `Free up space and open files the right way.`,
                        tags: ['storage', 'files'],
                        children: [
                            {
                                id: 'storage_almost_full',
                                title: 'Storage almost full',
                                summary: 'Drive in the red zone.',
                                response: `1. Go to Settings > System > Storage and run the cleanup suggestions.
2. Empty Downloads and Recycle Bin and move large files to an external drive or cloud.
3. Uninstall games or apps you no longer use.`,
                                tags: ['storage'],
                                links: [
                                    { label: 'Microsoft: Free up drive space', url: 'https://support.microsoft.com/search?query=Free%20up%20drive%20space%20Windows' },
                                ],
                            },
                            {
                                id: 'cant_download_browser',
                                title: 'Browser will not download files',
                                summary: 'Downloads fail or vanish.',
                                response: `1. Check the browser download folder and make sure you have free space.
2. Try a different download folder or a different browser.
3. Restart the browser and the PC.`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot downloads in Edge', url: 'https://support.microsoft.com/search?query=Troubleshoot%20downloads%20in%20Edge%20Windows' },
                                ],
                            },
                            {
                                id: 'zip_wont_open',
                                title: 'ZIP file will not open',
                                summary: 'Windows reports errors.',
                                response: `1. Right-click the ZIP and choose Extract All to a new folder.
2. If it still fails, ask the sender to resend it. You can also try 7-Zip.
3. Save ZIP files to your computer before opening them.`,
                                tags: ['files'],
                                links: [
                                    { label: 'Microsoft: Zip and unzip files', url: 'https://support.microsoft.com/search?query=Zip%20and%20unzip%20files%20Windows' },
                                ],
                            },
                            {
                                id: 'file_association_wrong',
                                title: 'Wrong app opens files',
                                summary: 'Need to reset defaults.',
                                response: `1. Right-click the file, choose Open with, then pick the app and select Always use.
2. Or go to Settings > Apps > Default apps and choose the app you want.
3. Reinstall the app if nothing will open it.`,
                                tags: ['files'],
                                links: [
                                    { label: 'Microsoft: Change default programs', url: 'https://support.microsoft.com/search?query=Change%20default%20programs%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'apps_shell',
                        title: 'Apps, Explorer, and Start menu',
                        summary: 'Shell and Store annoyances.',
                        response: `Fix the Windows desktop, Start menu, and apps.`,
                        tags: ['apps'],
                        children: [
                            {
                                id: 'file_explorer_not_responding',
                                title: 'File Explorer not responding',
                                summary: 'Explorer hangs or crashes.',
                                response: `1. Press Ctrl + Shift + Esc, select Windows Explorer, and click Restart.
2. Open File Explorer Options and click Clear under Quick access.
3. Install Windows updates and restart.`,
                                tags: ['explorer'],
                                links: [
                                    { label: 'Microsoft: File Explorer help', url: 'https://support.microsoft.com/search?query=File%20Explorer%20help%20Windows' },
                                ],
                            },
                            {
                                id: 'microsoft_store_install_fail',
                                title: 'Microsoft Store cannot install apps',
                                summary: 'Downloads stuck at pending.',
                                response: `1. Sign out and back in to the Microsoft Store.
2. Restart the PC.
3. Check that the date/time is correct and you have free storage.`,
                                tags: ['store'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot Microsoft Store', url: 'https://support.microsoft.com/search?query=Troubleshoot%20Microsoft%20Store%20Windows' },
                                ],
                            },
                            {
                                id: 'store_icons_missing',
                                title: 'Store apps missing icons',
                                summary: 'Start menu tiles blank.',
                                response: `1. Reinstall the affected app from Microsoft Store.
2. Run the Windows Store Apps troubleshooter in Settings > System > Troubleshoot.
3. Restart the PC.`,
                                tags: ['store'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot Microsoft Store', url: 'https://support.microsoft.com/search?query=Troubleshoot%20Microsoft%20Store%20Windows' },
                                ],
                            },
                            {
                                id: 'taskbar_frozen',
                                title: 'Taskbar frozen or missing icons',
                                summary: 'Taskbar stops responding.',
                                response: `1. Restart Windows Explorer from Task Manager.
2. Restart the PC and disable any taskbar add-ons.
3. Install Windows updates.`,
                                tags: ['taskbar'],
                                links: [
                                    { label: 'Microsoft: Fix taskbar problems', url: 'https://support.microsoft.com/search?query=Fix%20taskbar%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'start_menu_not_opening',
                                title: 'Start menu not opening',
                                summary: 'Button does nothing.',
                                response: `1. Restart the PC.
2. Install Windows updates.
3. If it still does not open, try a new local account or ask for help.`,
                                tags: ['start menu'],
                                links: [
                                    { label: 'Microsoft: Fix Start menu', url: 'https://support.microsoft.com/search?query=Fix%20Start%20menu%20Windows' },
                                ],
                            },
                            {
                                id: 'cortana_search_not_working',
                                title: 'Search or Cortana not finding files',
                                summary: 'Results stay blank.',
                                response: `1. Restart the PC.
2. Run the Search and Indexing troubleshooter in Settings > System > Troubleshoot.
3. Update Windows.`,
                                tags: ['search'],
                                links: [
                                    { label: 'Microsoft: Fix search problems', url: 'https://support.microsoft.com/search?query=Fix%20search%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'time_date_incorrect',
                                title: 'Time and date incorrect',
                                summary: 'Clock drifts or shows the wrong zone.',
                                response: `1. Right-click the clock, choose Adjust date/time, then click Sync now.
2. Turn on "Set time automatically" and "Set time zone automatically."
3. If it still looks wrong, pick the correct time zone manually.`,
                                tags: ['time'],
                                links: [
                                    { label: 'Microsoft: Synchronize your clock', url: 'https://support.microsoft.com/search?query=Synchronize%20your%20clock%20Windows' },
                                ],
                            },
                            {
                                id: 'too_many_notifications',
                                title: 'Too many notifications',
                                summary: 'Action Center overwhelmed.',
                                response: `1. Go to Settings > System > Notifications and turn off noisy apps.
2. Turn on Focus Assist during meetings or gaming.
3. Turn off Windows tips and suggestions.`,
                                tags: ['notifications'],
                                links: [
                                    { label: 'Microsoft: Change notification settings', url: 'https://support.microsoft.com/search?query=Change%20notification%20settings%20Windows' },
                                ],
                            },
                            {
                                id: 'clipboard_history_not_working',
                                title: 'Clipboard history not working',
                                summary: 'Win(logo) + V does nothing.',
                                response: `1. Go to Settings > System > Clipboard and turn Clipboard history on.
2. Restart the PC.
3. If you want clipboard sync, sign into your Microsoft account.`,
                                tags: ['clipboard'],
                                links: [
                                    { label: 'Microsoft: Use Clipboard history', url: 'https://support.microsoft.com/search?query=Use%20Clipboard%20history%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'browser_email',
                        title: 'Browser & email cleanup',
                        summary: 'Keep web and mail friendly.',
                        response: `Fix slow browsers and stuck email.`,
                        tags: ['browser', 'email'],
                        children: [
                            {
                                id: 'browser_slow',
                                title: 'Edge/Chrome running slow',
                                summary: 'Tabs take forever.',
                                response: `1. Close unused tabs and extensions.
2. Clear browsing data in the browser settings.
3. Restart the browser, or reset it if it stays slow.`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Improve browser performance', url: 'https://support.microsoft.com/search?query=Improve%20browser%20performance%20Windows' },
                                ],
                            },
                            {
                                id: 'browser_homepage_hijacked',
                                title: 'Browser homepage hijacked',
                                summary: 'Unknown search takes over.',
                                response: `1. Reset the browser to defaults.
2. Remove any extensions you do not recognize.
3. Run a Windows Security scan to clean adware.`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Remove pop-ups, redirects, malware', url: 'https://support.microsoft.com/search?query=Remove%20pop-ups%2C%20redirects%2C%20malware%20Windows' },
                                ],
                            },
                            {
                                id: 'outlook_not_syncing',
                                title: 'Outlook will not send/receive',
                                summary: 'Mail stuck in Outbox.',
                                response: `1. In Outlook, turn Work Offline off.
2. Re-enter your password or approve the sign-in prompt.
3. Use File > Account Settings > Repair to fix the Outlook profile.`,
                                tags: ['email'],
                                links: [
                                    { label: 'Microsoft: Fix send/receive errors in Outlook', url: 'https://support.microsoft.com/search?query=Fix%20send/receive%20errors%20in%20Outlook%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'accounts_cloud',
                        title: 'Accounts, parental controls, backup',
                        summary: 'Stay signed in and in control.',
                        response: `Help with logins, cloud sync, and backup reminders.`,
                        tags: ['accounts'],
                        children: [
                            {
                                id: 'microsoft_password_beginner',
                                title: 'Forgot Microsoft account password',
                                summary: 'Need to reset at account.live.com.',
                                response: `1. Go to https://account.live.com/password/reset and choose "I forgot my password."
2. Follow the steps to prove it is you.
3. Set a new password and sign back in on Outlook, OneDrive, and Teams.`,
                                tags: ['accounts'],
                            },
                            {
                                id: 'onedrive_not_syncing_simple',
                                title: 'OneDrive not syncing',
                                summary: 'Cloud icon shows an error.',
                                response: `1. Pause syncing, then resume from the OneDrive cloud icon.
2. Make sure you are signed into the correct account and have free space.
3. If needed, unlink this PC and sign in again.`,
                                tags: ['onedrive'],
                            },
                            {
                                id: 'parental_controls_blocking',
                                title: 'Parental controls blocking sites',
                                summary: 'Family Safety too strict.',
                                response: `1. Go to family.microsoft.com and adjust the child's web filters.
2. Allow more time or unblock specific sites.
3. Sync the child's device so changes apply.`,
                                tags: ['family'],
                                links: [
                                    { label: 'Microsoft: Adjust Family Safety settings', url: 'https://support.microsoft.com/search?query=Adjust%20Family%20Safety%20settings%20Windows' },
                                ],
                            },
                            {
                                id: 'backup_reminder_annoying',
                                title: 'Backup reminders annoying',
                                summary: 'Constant prompts for OneDrive/File History.',
                                response: `1. If you use OneDrive, let the first backup finish or pause syncing.
2. Turn off Backup in Settings if you do not plan to use it.
3. If you do want backups, schedule them so the reminders make sense.`,
                                tags: ['backup'],
                                links: [
                                    { label: 'Microsoft: Back up your files', url: 'https://support.microsoft.com/search?query=Back%20up%20your%20files%20Windows' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'win_update',
                        title: 'Windows update is stuck',
                        summary: 'Update loop, spinning dots, feature install fails.',
                        response: `1. Restart the PC, plug it into power, and run Settings > Windows Update again.
2. Run the Windows Update troubleshooter in Settings > System > Troubleshoot.
3. Free up at least 20 GB of storage.
4. If it still will not update, use the Windows Update Assistant or ask for help.`,
                        tags: ['windows', 'updates'],
                        links: [
                            { label: 'Microsoft support article', url: 'https://support.microsoft.com/search?query=Microsoft%20support%20article%20Windows' }
                        ]
                    },
                    {
                        id: 'office_password',
                        title: 'Reset Microsoft / Office password',
                        summary: 'Account.live.com reset flow.',
                        response: `1. Go to https://account.live.com/password/reset and choose "I forgot my password."
2. Follow the steps and approve the code you receive.
3. Set a new password, then sign back in on Outlook, Teams, and OneDrive.
4. Update your recovery phone or email if it asks.`,
                        tags: ['microsoft', 'accounts'],
                        links: [
                            { label: 'Account recovery portal', url: 'https://account.live.com/password/reset' },
                            { label: 'Video guide', url: 'https://www.youtube.com/watch?v=ypvcvVp4Vqk' }
                        ]
                    },
                    {
                        id: 'teams_media',
                        title: 'Teams audio or camera not working',
                        summary: 'Pick the right mic / cam and clear cache.',
                        response: `1. In Teams, open Settings > Devices and pick the microphone, speaker, and camera you want. Use "Make a test call."
2. Close other apps that might be using the camera or mic, then restart Teams.
3. Update Teams and restart the PC if needed.`,
                        tags: ['teams', 'meetings'],
                        links: [
                            { label: 'Teams troubleshooting video', url: 'https://www.youtube.com/watch?v=Tzo3BLYgj3U' }
                        ]
                    }
                ]
            },
            {
                id: 'apple_ios_mac',
                title: 'Apple - iOS - macOS',
                summary: 'Apple ID, iPhone power, Mac performance.',
                response: `Use this for Apple ID help, an iPhone that will not turn on, or a slow Mac. Tip: on iPhone or iPad, swipe down from the top-right for quick settings and open the Settings app for Wi-Fi, Bluetooth, and battery. On Mac, click the Apple menu > System Settings.`,
                tags: ['apple'],
                children: [
                    {
                        id: 'apple_id',
                        title: 'Forgot Apple ID password',
                        summary: 'iforgot.apple.com recovery.',
                        response: `1. Go to https://iforgot.apple.com/ and enter your Apple ID email or phone.
2. Follow the prompts to get a code on a trusted device, phone, or email.
3. Set a new password and sign back in on your devices.
4. Check your trusted phone numbers in Apple ID settings.`,
                        tags: ['apple id', 'security'],
                        links: [
                            { label: 'Apple walkthrough (video)', url: 'https://www.youtube.com/watch?v=4w37whqIAJ0' }
                        ]
                    },
                    {
                        id: 'iphone_power',
                        title: 'iPhone or iPad will not power on',
                        summary: 'Force restart + charging checks.',
                        response: `1. Force restart: press Volume Up, press Volume Down, then hold the Side button until the Apple logo.
2. Charge with a known-good cable and charger for at least 15 minutes. Gently clean the Lightning or USB-C port.
3. If the screen stays black but you hear sounds, connect to a computer and try to restore with Finder or iTunes.
4. If it is still dead, it may need a battery or hardware repair.`,
                        tags: ['ios', 'power'],
                        links: [
                            { label: 'Apple support video', url: 'https://www.youtube.com/watch?v=bwjcYyCneNc' }
                        ]
                    },
                    {
                        id: 'iphone_wifi',
                        title: 'iPhone Wi-Fi will not connect',
                        summary: 'Forget network, toggle radios.',
                        response: `1. Open Control Center, turn Airplane mode on and off, then turn Wi-Fi off and on.
2. Go to Settings > Wi-Fi, tap the (i) next to your network, and choose Forget This Network. Rejoin with the password.
3. Restart the router and the iPhone, and stand close to the router while reconnecting.
4. If it still will not connect, go to Settings > General > Transfer or Reset iPhone > Reset > Reset Network Settings.`,
                        tags: ['ios', 'wifi'],
                        links: [
                            { label: 'Apple Wi-Fi basics', url: 'https://support.apple.com/HT202639' }
                        ]
                    },
                    {
                        id: 'iphone_storage',
                        title: 'iPhone storage is full',
                        summary: 'Offload apps and clear media.',
                        response: `1. Go to Settings > General > iPhone Storage and turn on "Offload Unused Apps."
2. Empty Photos > Albums > Recently Deleted. Move large videos to iCloud or Drive.
3. Delete old message threads with lots of photos or videos, and clear Safari history if needed.
4. Keep a few GB free so updates install smoothly.`,
                        tags: ['ios', 'storage'],
                        links: [
                            { label: 'Apple storage tips', url: 'https://support.apple.com/HT201656' }
                        ]
                    },
                    {
                        id: 'mac_performance',
                        title: 'Mac running hot or slow',
                        summary: 'Safe Mode, Activity Monitor, updates.',
                        response: `1. Start in Safe Mode (hold Shift while starting), log in, then restart normally.
2. Open Activity Monitor (search with Spotlight) and quit apps using a lot of CPU.
3. Update macOS in System Settings > General > Software Update and keep free space.
4. If it still runs hot or slow, run Apple Diagnostics or get help from Apple Support.`,
                        tags: ['mac', 'performance'],
                        links: [
                            { label: 'Apple diagnostics article', url: 'https://support.apple.com/en-us/HT201262' }
                        ]
                    }
                ]
            },
            {
                id: 'android_google',
                title: 'Android - Google',
                summary: 'Charging, storage, account recovery.',
                response: `Use this for Android phones or tablets and Google accounts. Tip: swipe down twice for quick settings, tap the gear to open Settings, and use the search bar at the top.`,
                tags: ['android', 'google'],
                children: [
                    {
                        id: 'android_power',
                        title: 'Android phone/tablet will not charge',
                        summary: 'Force restart + port care.',
                        response: `1. Hold Power + Volume Down for about 20 seconds to restart.
2. Check and gently clean the USB-C port. Try another cable, charger, and wall outlet.
3. Leave it charging for 15 minutes, then try again.
4. If it still will not charge, it may need service.`,
                        tags: ['android', 'power'],
                        links: [
                            { label: 'Google support: battery tips', url: 'https://support.google.com/android/answer/7664692' }
                        ]
                    },
                    {
                        id: 'android_wifi',
                        title: 'Android Wi-Fi will not connect',
                        summary: 'Forget network + airplane toggle.',
                        response: `1. Swipe down twice, turn Airplane mode on and off, then turn Wi-Fi off and on.
2. Go to Settings > Network & internet > Internet or Wi-Fi, forget the network, then reconnect with the password.
3. Restart the router and the phone, and test close to the router.
4. If it still will not connect, go to Settings > System > Reset options > Reset Wi-Fi, mobile & Bluetooth.`,
                        tags: ['android', 'wifi'],
                        links: [
                            { label: 'Android Wi-Fi help', url: 'https://support.google.com/android/answer/9075847' }
                        ]
                    },
                    {
                        id: 'google_account',
                        title: 'Google account recovery',
                        summary: 'accounts.google.com/signin/recovery',
                        response: `1. Go to https://accounts.google.com/signin/recovery and enter the email or phone for the account.
2. Answer the prompts as best you can.
3. After you get in, visit https://myaccount.google.com/security to review your security settings.
4. Add a recovery phone or email so it is easier next time.`,
                        tags: ['google', 'security'],
                        links: [
                            { label: 'Video walkthrough', url: 'https://www.youtube.com/watch?v=pvx6_FqfrwE' }
                        ]
                    },
                    {
                        id: 'android_storage',
                        title: 'Android storage is full',
                        summary: 'Files by Google cleanup.',
                        response: `1. Open Files by Google and use Clean to remove junk and duplicates.
2. Move large photos and videos to cloud storage or an SD card.
3. Empty the trash in Photos or Drive and uninstall apps you do not use.
4. Keep some free space for updates.`,
                        tags: ['android', 'storage'],
                        links: [
                            { label: 'Files by Google video', url: 'https://www.youtube.com/watch?v=lAnqp7VJ-c0' }
                        ]
                    },
                    {
                        id: 'android_apps_crashing',
                        title: 'Apps keep crashing (Android)',
                        summary: 'Update + clear cache.',
                        response: `1. Open the Play Store, go to Manage apps, and update all.
2. Long-press the app, go to App info > Storage, and tap Clear cache.
3. Restart the phone. If it still crashes, uninstall and reinstall the app.
4. Make sure you have free storage for updates.`,
                        tags: ['android', 'apps'],
                        links: [
                            { label: 'Google Play help', url: 'https://support.google.com/googleplay/answer/7513003' }
                        ]
                    }
                ]
            },
            {
                id: 'network_wifi',
                title: 'Network - Wi-Fi',
                summary: 'Whole-home networking and routers.',
                response: `Pick this for home Wi-Fi outages, dropouts, or new routers.`,
                tags: ['network'],
                children: [
                    {
                        id: 'wifi_down',
                        title: 'Home Wi-Fi is down',
                        summary: 'Power-cycle ISP modem + router.',
                        response: `1. Unplug the modem and router for 30 seconds. Plug in the modem first, wait for steady lights, then plug in the router.
2. Check cables and lights. If the modem lights look wrong, contact your internet provider.
3. Forget and rejoin the Wi-Fi network on your devices with the correct password.
4. Update the router using its app or web setup if available.`,
                        tags: ['network', 'wifi'],
                        links: [
                            { label: 'NETGEAR firmware guide', url: 'https://kb.netgear.com/23442/How-do-I-update-the-firmware-on-my-NETGEAR-router-with-a-web-browser' }
                        ]
                    },
                    {
                        id: 'wifi_dropping',
                        title: 'Wi-Fi keeps dropping',
                        summary: 'Separate bands + optimize channels.',
                        response: `1. Place the router in a central spot away from thick walls and microwaves.
2. If you have two Wi-Fi names, use 5 GHz when close to the router and 2.4 GHz when farther away.
3. Restart the router and install router updates if the app offers them.
4. Consider a mesh system for large or multi-story homes.`,
                        tags: ['wifi'],
                        links: [
                            { label: 'TP-Link Deco playlist', url: 'https://www.youtube.com/playlist?list=PLW_5HFrpMZg9QJVdT1Tzm4NC-PbFY7NgI' }
                        ]
                    },
                    {
                        id: 'router_setup',
                        title: 'New router setup',
                        summary: 'Out-of-box hardening.',
                        response: `1. Connect the modem to the router's WAN port. Use the router setup app or the web address on the router sticker (often 192.168.0.1 or 192.168.1.1).
2. Change the admin password and set a Wi-Fi name and password. Use WPA2 or WPA3 security.
3. Turn off WPS and install router updates.
4. Save or back up your settings if the app offers it.`,
                        tags: ['router'],
                        links: [
                            { label: 'Video: NETGEAR setup', url: 'https://www.youtube.com/watch?v=-wkSaOJi2k4' }
                        ]
                    }
                ]
            },
            {
                id: 'hardware_accessories',
                title: 'Hardware - Accessories',
                summary: 'Printers, webcams, Bluetooth peripherals.',
                response: `Start here for printers, webcams, and Bluetooth gear. Quick steps: check power, cables, and Wi-Fi lights; open Settings > Bluetooth & devices; unplug and replug if something is missing.`,
                tags: ['peripherals'],
                children: [
                    {
                        id: 'printer_offline',
                        title: 'Printer shows offline',
                        summary: 'Power cycle + reinstall drivers.',
                        response: `1. Turn the printer and the computer or phone off and on.
2. Make sure both are on the same Wi-Fi, or that the USB cable is snug.
3. Clear the print queue and reinstall using the maker's app.
4. On Windows, go to Settings > Bluetooth & devices > Printers and choose the correct default printer.`,
                        tags: ['printer'],
                        links: [
                            { label: 'HP support video', url: 'https://www.youtube.com/watch?v=kdCJdQ0kGFM' }
                        ]
                    },
                    {
                        id: 'webcam_missing',
                        title: 'Webcam not detected',
                        summary: 'Privacy + driver check.',
                        response: `1. Close other apps that might be using the camera, then reopen the meeting app.
2. Allow camera access in Windows or macOS privacy settings.
3. Install camera updates from the device maker.
4. Try a different USB port or an external webcam to test the hardware.`,
                        tags: ['webcam'],
                        links: [
                            { label: 'Microsoft support video', url: 'https://www.youtube.com/watch?v=Jv2d3Y17Sqs' }
                        ]
                    },
                    {
                        id: 'bluetooth_pairing',
                        title: 'Bluetooth device will not pair',
                        summary: 'Forget + re-add, clear interference.',
                        response: `1. Turn Bluetooth off and on on both devices and forget the accessory before pairing again.
2. Charge both devices and keep them within a few feet while pairing.
3. Remove old Bluetooth entries in Settings if you see duplicates, then restart.
4. Move away from routers or microwaves to reduce interference.`,
                        tags: ['bluetooth'],
                        links: [
                            { label: 'Microsoft fix video', url: 'https://www.youtube.com/watch?v=Jm9-sKMNfWc' }
                        ]
                    }
                ]
            }
        ]
    };

    const state = {
        history: []
    };

    const els = {
        path: document.getElementById('nodePath'),
        title: document.getElementById('nodeTitle'),
        summary: document.getElementById('nodeSummary'),
        response: document.getElementById('nodeResponse'),
        tags: document.getElementById('nodeTags'),
        links: document.getElementById('nodeLinks'),
        children: document.getElementById('nodeChildren'),
        backBtn: document.getElementById('backBtn'),
        restartBtn: document.getElementById('restartBtn'),
        copyPlanBtn: document.getElementById('copyPlanBtn'),
        startBtn: document.getElementById('startTree'),
        embedBtn: document.getElementById('copyEmbed'),
        embedCode: document.getElementById('embedCode'),
        panel: document.getElementById('treePanel')
    };

    const updateVisitCounter = async () => {
        const valueEl = document.getElementById('visitCounterValue');
        if (!valueEl) return;
        const statusEl = document.getElementById('visitCounterStatus');
        try {
            const endpoint = 'https://api.counterapi.dev/v1/gtbaileyitsolutionsllc/visits/up';
            const response = await fetch(endpoint, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Counter request failed');
            }
            const data = await response.json();
            if (typeof data.count === 'number') {
                valueEl.textContent = data.count.toLocaleString();
                if (statusEl) {
                    statusEl.textContent = 'Global counter updated.';
                }
                return;
            }
            throw new Error('Counter response missing count');
        } catch (error) {
            let count = 1;
            try {
                const key = 'gtb_visit_count_local';
                const stored = parseInt(localStorage.getItem(key) || '0', 10);
                count = Number.isNaN(stored) ? 1 : stored + 1;
                localStorage.setItem(key, String(count));
            } catch {
                count = 1;
            }
            valueEl.textContent = count.toLocaleString();
            if (statusEl) {
                statusEl.textContent = 'Offline: showing a local fallback count.';
            }
        }
    };

    updateVisitCounter();

    const lineWrap = (text = '') => text.replace(/\s+/g, ' ').trim();

    // Convert URLs in text to clickable links
    const linkify = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: underline;">${url}</a>`;
        });
    };

    const formatBlock = (block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        if (!lines.length) {
            return '';
        }
        const numbered = lines.every((line) => /^\d+\./.test(line));
        if (numbered) {
            const items = lines.map((line) => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('');
            return `<ol>${items}</ol>`;
        }
        const bulleted = lines.every((line) => line.startsWith('- '));
        if (bulleted) {
            const items = lines.map((line) => `<li>${line.replace(/^-\s*/, '')}</li>`).join('');
            return `<ul>${items}</ul>`;
        }
        return `<p>${lines.join(' ')}</p>`;
    };

    const formatResponse = (text = '') => {
        if (!text) {
            return '';
        }

        const lines = text
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        const summary = [];
        const steps = [];
        let currentStep = null;

        lines.forEach((line) => {
            const match = line.match(/^(\d+)\.\s*(.+)/);
            if (match) {
                if (currentStep) {
                    steps.push(currentStep);
                }
                currentStep = {
                    index: match[1],
                    title: match[2],
                    detail: [],
                };
            } else if (currentStep) {
                currentStep.detail.push(line);
            } else {
                summary.push(line);
            }
        });

        if (currentStep) {
            steps.push(currentStep);
        }

        const summaryHtml = summary
            .map((para) => `<p class="plan-blurb">${linkify(para)}</p>`)
            .join('');

        const stepsHtml = steps.length
            ? `<div class="plan-grid">${steps
                  .map(
                      (step) => `<article class="plan-card">
                            <div class="plan-step">${step.index}</div>
                            <div class="plan-card-body">
                                <h3>${linkify(step.title)}</h3>
                                ${
                                    step.detail.length
                                        ? `<p>${linkify(step.detail.join(' '))}</p>`
                                        : ''
                                }
                            </div>
                        </article>`,
                  )
                  .join('')}</div>`
            : '';

        return summaryHtml + stepsHtml;
    };

    const getCurrentNode = () => state.history[state.history.length - 1];

    const render = () => {
        const node = getCurrentNode();
        // Use breadcrumb field if available, otherwise use title
        els.path.textContent = state.history.map((item) => item.breadcrumb || item.title).join(' / ');
        
        if (node.title === 'Choose a Help Topic') {
            els.title.textContent = node.title;
            els.title.classList.add('node-title-minimal');
        } else {
            els.title.textContent = node.title;
            els.title.classList.remove('node-title-minimal');
        }
        
        els.summary.textContent = node.summary || '';
        els.response.innerHTML = formatResponse(node.response || '');

        els.tags.innerHTML = '';
        (node.tags || []).forEach((tag) => {
            const badge = document.createElement('span');
            badge.className = 'node-tag';
            badge.textContent = tag;
            els.tags.appendChild(badge);
        });

        els.links.innerHTML = '';
        console.log('Adding links:', node.links);
        (node.links || []).forEach((link) => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.target = '_blank';
            anchor.rel = 'noopener';
            anchor.textContent = link.label || link.url;
            anchor.style.pointerEvents = 'auto';
            anchor.style.cursor = 'pointer';
            anchor.addEventListener('click', (e) => {
                console.log('Link clicked:', link.url);
            });
            els.links.appendChild(anchor);
            console.log('Added link:', link.label, link.url);
        });

        els.children.innerHTML = '';
        if (node.children && node.children.length) {
            node.children.forEach((child) => {
                const card = document.createElement('article');
                card.className = 'child-card';

                const title = document.createElement('h3');
                title.textContent = child.title;
                card.appendChild(title);

                if (child.summary) {
                    const summary = document.createElement('p');
                    summary.style.margin = '0';
                    summary.style.color = 'var(--text-muted)';
                    summary.textContent = child.summary;
                    card.appendChild(summary);
                }

                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = 'Open plan';
                button.addEventListener('click', () => {
                    state.history.push(child);
                    render();
                });
                card.appendChild(button);

                els.children.appendChild(card);
            });
        } else {
            const done = document.createElement('div');
            done.style.padding = '16px';
            done.style.border = '1px dashed rgba(255,255,255,0.2)';
            done.style.borderRadius = '16px';
            done.style.color = 'var(--text-muted)';
            done.textContent = 'You are at a leaf in the tree. After trying the steps above, go back or restart to explore another path.';
            els.children.appendChild(done);
        }

        els.backBtn.disabled = state.history.length <= 1;
        els.restartBtn.disabled = state.history.length <= 1;
        els.copyPlanBtn.disabled = !node || !node.response;
    };

    const startTree = ({ scroll = false } = {}) => {
        state.history = [DECISION_TREE];
        render();
        if (scroll && els.panel) {
            els.panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    els.backBtn.addEventListener('click', () => {
        if (state.history.length > 1) {
            state.history.pop();
            render();
        }
    });

    els.restartBtn.addEventListener('click', () => {
        if (state.history.length) {
            state.history = [DECISION_TREE];
            render();
        }
    });

    els.copyPlanBtn.addEventListener('click', async () => {
        const node = getCurrentNode();
        if (!node) return;
        const text = [
            `Plan: ${node.title}`,
            node.summary ? `Summary: ${node.summary}` : '',
            '',
            node.response,
            '',
            ...(node.links || []).map((link) => `${link.label}: ${link.url}`)
        ]
            .filter(Boolean)
            .join('\n');
        try {
            await navigator.clipboard.writeText(text);
            els.copyPlanBtn.textContent = 'Copied!';
            setTimeout(() => (els.copyPlanBtn.textContent = 'Copy plan'), 1800);
        } catch (error) {
            alert('Clipboard is unavailable. Copy manually:\n\n' + text);
        }
    });

    [els.startBtn, document.getElementById('inlineStartBtn')].forEach(btn => btn && btn.addEventListener('click', () => {
        startTree({ scroll: true });
    }));
    // Auto-load the tree on page ready so the UI always initializes even if the button click is blocked.
    startTree({ scroll: false });

    // Optional embed button (may not exist in all versions)
    if (els.embedBtn && els.embedCode) {
        els.embedBtn.addEventListener('click', async () => {
            const snippet = els.embedCode.textContent.trim();
            try {
                await navigator.clipboard.writeText(snippet);
                els.embedBtn.textContent = 'Snippet copied';
                setTimeout(() => (els.embedBtn.textContent = 'Copy snippet'), 1600);
            } catch (error) {
                alert('Clipboard is unavailable. Copy manually from the code block.');
            }
        });
    }

    // Initialize with a placeholder so the UI feels live even before first click.
    state.history = [{
        breadcrumb: "Tell GT Bailey what's happening",
        title: 'Choose a Help Topic',
        summary: 'Click "Start troubleshooting" to begin.',
        response: 'Pick a lane above to load your first branch.'
    }];
    render();

    // Affirmations / virtual phone loop
    (() => {
        const affirmations = [
            { tag: 'Grounding', text: 'Your calm presence is a diagnostic tool - breathe and let the next step appear.', source: '- GT Bailey Support' },
            { tag: 'Confidence', text: 'You have navigated harder days. Trust the resilience you already built.', source: '- GT Bailey Support' },
            { tag: 'Leadership', text: 'Lead with curiosity, not perfection. Ask the question that unlocks momentum.', source: '- GT Bailey Support' },
            { tag: 'Release', text: 'Unclench your jaw. Breathe into the space you just made.', source: '- GT Bailey Support' },
            { tag: 'Reset', text: 'Hydrate, stretch, then reset your focus. Your mind needs its own buffer.', source: '- GT Bailey Support' },
            { tag: 'Connection', text: 'Joy is contagious. Share one tiny win before you close your notebook.', source: '- GT Bailey Support' },
            { tag: 'Focus', text: 'Silence the notifications. Give your attention to one thing that matters.', source: '- GT Bailey Support' },
            { tag: 'Perspective', text: 'You are not behind; you are pacing yourself for a longer season.', source: '- GT Bailey Support' },
            { tag: 'Calm', text: 'One calm breath can reset the whole room. Start there.', source: '- GT Bailey Support' },
            { tag: 'Progress', text: 'Progress counts even when it is small and quiet.', source: '- GT Bailey Support' },
            { tag: 'Clarity', text: 'You are allowed to ask for clarity. It is a strength.', source: '- GT Bailey Support' },
            { tag: 'Ease', text: 'Keep your shoulders soft. Your mind works better with less tension.', source: '- GT Bailey Support' },
            { tag: 'Experience', text: 'You have solved problems like this before. The path will show up.', source: '- GT Bailey Support' },
            { tag: 'Momentum', text: 'Set one tiny goal, finish it, then pick the next.', source: '- GT Bailey Support' },
            { tag: 'Patience', text: 'Your patience protects the customer and your own energy.', source: '- GT Bailey Support' },
            { tag: 'Kindness', text: 'Kind words to yourself are also part of the fix.', source: '- GT Bailey Support' },
            { tag: 'Boundaries', text: 'Boundaries are professional. You can say no and still care.', source: '- GT Bailey Support' },
            { tag: 'Steadiness', text: 'You do not need to rush. You need to be steady.', source: '- GT Bailey Support' },
            { tag: 'Gratitude', text: 'Gratitude for one small win builds momentum.', source: '- GT Bailey Support' },
            { tag: 'Rest', text: 'Rest is part of good work. Take a sip of water.', source: '- GT Bailey Support' },
        ];
        const tagEl = document.getElementById('affirmationTag');
        const textEl = document.getElementById('affirmationText');
        const srcEl = document.getElementById('affirmationSource');
        const timeEl = document.getElementById('affirmationTime');
        const nextBtn = document.getElementById('affirmationNext');
        let idx = 0;
        let cycleTimer = null;

        if (!tagEl || !textEl || !srcEl) {
            return;
        }

        const updateTime = () => {
            if (!timeEl) return;
            const date = new Date();
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            timeEl.textContent = `${hours}:${minutes} ${ampm}`;
        };

        const renderAffirmation = () => {
            const a = affirmations[idx % affirmations.length];
            tagEl.textContent = a.tag;
            textEl.textContent = a.text;
            srcEl.textContent = a.source;
        };

        const nextAffirmation = () => {
            idx = (idx + 1) % affirmations.length;
            renderAffirmation();
        };

        const startCycle = () => {
            cycleTimer = setInterval(nextAffirmation, 8000);
        };

        const resetCycle = () => {
            clearInterval(cycleTimer);
            startCycle();
        };

        updateTime();
        renderAffirmation();
        setInterval(updateTime, 15000);
        startCycle();
        nextBtn?.addEventListener('click', () => {
            nextAffirmation();
            resetCycle();
        });

        const stage = document.querySelector('[data-role=\"affirmation-stage\"]');
        const rig = document.querySelector('[data-role=\"affirmation-rig\"]');
        if (stage && rig) {
            let rotationX = -6;
            let rotationY = 12;
            let activePointerId = null;
            let isDragging = false;
            let lastPointerX = 0;
            let lastPointerY = 0;
            const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
            const applyTransform = () => {
                rig.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            };
            const resetTilt = () => {
                rotationX = -6;
                rotationY = 12;
                applyTransform();
            };

            const beginPointerDrag = (event) => {
                if (event.button !== undefined && event.button !== 0) {
                    return;
                }
                event.preventDefault();
                isDragging = true;
                activePointerId = event.pointerId;
                lastPointerX = event.clientX;
                lastPointerY = event.clientY;
                stage.setPointerCapture?.(event.pointerId);
            };

            const handlePointerMove = (event) => {
                if (!isDragging || event.pointerId !== activePointerId) {
                    return;
                }
                const deltaX = event.clientX - lastPointerX;
                const deltaY = event.clientY - lastPointerY;
                rotationY = clamp(rotationY + deltaX * 0.2, -22, 22);
                rotationX = clamp(rotationX - deltaY * 0.2, -18, 18);
                applyTransform();
                lastPointerX = event.clientX;
                lastPointerY = event.clientY;
            };

            const endPointerDrag = (event) => {
                if (!isDragging || event.pointerId !== activePointerId) {
                    return;
                }
                isDragging = false;
                activePointerId = null;
                stage.releasePointerCapture?.(event.pointerId);
                resetTilt();
            };

            stage.addEventListener('pointerdown', beginPointerDrag, { passive: false });
            stage.addEventListener('pointermove', handlePointerMove);
            stage.addEventListener('pointerup', endPointerDrag);
            stage.addEventListener('pointercancel', endPointerDrag);
            stage.addEventListener('pointerleave', endPointerDrag);
            applyTransform();
        }
    })();
})();

const initBusinessCardInteraction = () => {
    const stage = document.getElementById('businessCardStage');
    const card = document.getElementById('businessCard');
    if (!stage || !card) {
        return false;
    }

    let activePointerId = null;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let rotationX = -6;
    let rotationY = 12;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const applyTransform = () => {
        card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };
    const resetTilt = () => {
        rotationX = -6;
        rotationY = 12;
        applyTransform();
    };

    const beginPointerDrag = (event) => {
        if (event.button !== undefined && event.button !== 0) {
            return;
        }
        event.preventDefault();
        isDragging = true;
        activePointerId = event.pointerId;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        stage.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        const deltaX = event.clientX - lastPointerX;
        const deltaY = event.clientY - lastPointerY;
        rotationY = clamp(rotationY + deltaX * 0.3, -25, 25);
        rotationX = clamp(rotationX - deltaY * 0.3, -20, 20);
        applyTransform();
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
    };

    const endPointerDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        isDragging = false;
        activePointerId = null;
        stage.releasePointerCapture?.(event.pointerId);
        resetTilt();
    };

    stage.addEventListener('pointerdown', beginPointerDrag, { passive: false });
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', endPointerDrag);
    stage.addEventListener('pointercancel', endPointerDrag);
    stage.addEventListener('pointerleave', endPointerDrag);

    applyTransform();
    return true;
};

(() => {
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    if (body) {
        body.classList.add('theme-light');
        try {
            localStorage.setItem('gtb-theme', 'light');
        } catch {}
    }
    const apply = () => {
        const isLight = body.classList.contains('theme-light');
        try {
            localStorage.setItem('gtb-theme', isLight ? 'light' : 'dark');
        } catch {}
    };
    toggle?.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        apply();
    });

    initBusinessCardInteraction();
})();

