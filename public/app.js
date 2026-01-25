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

    const CAPTURE_STEP = `4. Capture the details (2 min, easy)
Expected: You have the device model, OS version, exact error text, and what you already tried.
If yes: Send it with your help request.
If no: Write down what you can and continue.`;

    const DECISION_TREE = {
        id: 'root',
        title: 'Start here: quick triage',
        summary: 'Answer 3 quick questions so the steps fit your issue.',
        response: `Question 1: What device or area is closest to your issue?
Question 2: Is it just one device or more than one?
Question 3: Is anything unsafe, urgent, or at risk (burning smell, sparks, swelling battery, liquid spill, data loss, security)?
Pick a category below to begin.`,
        tags: [],
        children: [
            {
                id: 'microsoft_windows',
                title: 'Windows PC or laptop',
                summary: 'Windows devices, Microsoft accounts, Teams or Office.',
                response: `Quick triage: Is this only happening on this one PC? If more than one device is affected, check Wi-Fi and accounts first.
If anything feels unsafe (burning smell, swelling battery, liquid spill), stop and get help.
When ready, pick a topic below.`,
                tags: ['windows', 'office'],
                children: [
                    {
                        id: 'windows_power_boot',
                        title: 'Power and startup',
                        summary: 'Will not turn on, charging issues, or black screen.',
                        response: `Pick the closest match. If there are no lights or fan noise, start with "Computer will not power on."`,
                        tags: ['power', 'boot'],
                        children: [
                            {
                                id: 'computer_wont_turn_on',
                                title: 'Computer will not power on',
                                summary: 'No lights, no fans, totally dead.',
                                response: `Stop now if you smell burning or see sparks.
1. Power reset (2 min, easy)
Expected: A charging light, fan spin, or logo appears.
If yes: Go to step 3.
If no: Go to step 2.

2. Check the power source (3 min, easy)
Expected: Another outlet or charger shows a charge light.
If yes: Try to turn it on again.
If no: Laptop: try a known-good charger. Desktop: check the PSU switch and power cable.

3. Screen check (2 min, easy)
Expected: You see a logo or a faint image.
If yes: The device is on - switch to the "Black screen" topic if needed.
If no: Note any beeps or blinking lights.

${CAPTURE_STEP}`,
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
                                response: `1. Check the charger and port (2 min, easy)
Expected: The charging icon appears or the light turns on.
If yes: Leave it plugged in for 15 minutes.
If no: Try another outlet or charger if available.

2. Reset the battery driver (3 min, easy)
Expected: The battery entry returns after restart.
If yes: Test charging again.
If no: Go to step 3.

3. Update the device firmware (10 min, easy)
Expected: The update finishes without errors.
If yes: Test charging again.
If no: The battery or charger likely needs service.

${CAPTURE_STEP}`,
                                tags: ['battery', 'charger'],
                                links: [
                                    { label: 'Dell Support video', url: 'https://www.youtube.com/watch?v=bwjcYyCneNc' },
                                ],
                            },
                           {
                               id: 'windows_update_refresh',
                               title: 'Run Windows Update',
                               summary: 'Cycle updates after a repair.',
                                response: `1. Check for updates (5-15 min, easy)
Expected: Updates begin downloading.
If yes: Let them install and restart.
If no: Go to step 2.

2. Run the Windows Update troubleshooter (5 min, easy)
Expected: The troubleshooter reports a fix or finishes.
If yes: Check for updates again.
If no: Go to step 3.

3. Free space and try again (10 min, easy)
Expected: You have at least 20 GB free.
If yes: Retry Windows Update.
If no: Move large files or uninstall apps you do not use.

${CAPTURE_STEP}`,
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
                                response: `1. Unlink this PC (3 min, easy)
Expected: OneDrive shows it is not signed in.
If yes: Go to step 2.
If no: Close OneDrive and try again.

2. Sign in again (3 min, easy)
Expected: You see your correct account and folders.
If yes: Choose folders and continue.
If no: Double-check the email address and password.

3. Choose sync style (2 min, easy)
Expected: Files show green check marks or cloud icons.
If yes: Sync should resume.
If no: Restart the PC and open OneDrive again.

${CAPTURE_STEP}`,
                                tags: ['onedrive', 'sync'],
                                links: [
                                    { label: 'OneDrive sync troubleshooting', url: 'https://support.microsoft.com/search?query=OneDrive%20sync%20troubleshooting%20Windows' },
                                ],
                            },
                            {
                                id: 'black_screen',
                                title: 'Black screen / no display',
                                summary: 'Fans spin but nothing shows.',
                                response: `1. Check the monitor or screen (2 min, easy)
Expected: The display turns on or shows a menu.
If yes: Go to step 2.
If no: Try a different cable or port.

2. Try another display (5 min, easy)
Expected: You see the desktop on another screen.
If yes: The original screen or cable is the issue.
If no: Go to step 3.

3. Laptop flashlight test (2 min, easy)
Expected: A faint image appears when you shine a light.
If yes: The backlight may be out.
If no: Note any beeps or blinking lights.

${CAPTURE_STEP}`,
                                tags: ['display', 'hardware'],
                                links: [
                                    { label: 'Dell Support: no display', url: 'https://www.youtube.com/watch?v=Uhje3vFqlbo' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'performance_speed',
                        title: 'Performance and speed',
                        summary: 'Slow, freezing, hot, or loud fans.',
                        response: `Pick the closest match. If the device feels very hot or the fans are loud, start with "Overheating."`,
                        tags: ['performance'],
                        children: [
                            {
                                id: 'slow_computer',
                                title: 'Slow computer',
                                summary: 'General lag after updates or over time.',
                                response: `1. Close heavy apps (3 min, easy)
Expected: The PC feels snappier within a minute.
If yes: You are likely done.
If no: Go to step 2.

2. Free up storage (5-10 min, easy)
Expected: You have at least 15-20 GB free.
If yes: Restart and test again.
If no: Move large files or uninstall apps you do not use.

3. Trim startup apps (5 min, easy)
Expected: Fewer apps start automatically after reboot.
If yes: Restart and test speed again.
If no: Leave startup apps as-is and contact support.

${CAPTURE_STEP}`,
                                tags: ['performance'],
                                links: [
                                    { label: 'Microsoft: Improve PC performance', url: 'https://support.microsoft.com/search?query=Improve%20PC%20performance%20Windows' },
                                ],
                            },
                            {
                                id: 'freezing_lag',
                                title: 'Freezing / lagging',
                                summary: 'System hangs or apps stop responding.',
                                response: `1. Check if one app is the cause (3 min, easy)
Expected: Only one app is frozen or crashing.
If yes: Close it and reopen or reinstall it.
If no: Go to step 2.

2. Install updates and restart (10-20 min, easy)
Expected: Updates finish and the PC restarts normally.
If yes: Test again.
If no: Go to step 3.

3. Run a memory test (10 min, easy)
Expected: The test completes without errors.
If yes: The issue is likely software.
If no: Memory may need service.

${CAPTURE_STEP}`,
                                tags: ['stability'],
                                links: [
                                    { label: 'Microsoft: Fix freezes', url: 'https://support.microsoft.com/search?query=Fix%20freezes%20Windows' },
                                ],
                            },
                            {
                                id: 'overheating',
                                title: 'Overheating',
                                summary: 'Fans race, chassis feels hot.',
                                response: `1. Improve airflow (5 min, easy)
Expected: Fans slow down within a few minutes.
If yes: Keep vents clear and continue.
If no: Go to step 2.

2. Switch to a cooler power mode (2 min, easy)
Expected: The device runs quieter or cooler.
If yes: You are likely done.
If no: Go to step 3.

3. Update and recheck (10 min, easy)
Expected: Updates install and heat improves.
If yes: You are back in business.
If no: The device may need a cleaning service.

${CAPTURE_STEP}`,
                                tags: ['thermal'],
                                links: [
                                    { label: 'HP Support: Laptop overheating', url: 'https://support.hp.com/us-en/document/c01657439' },
                                ],
                            },
                            {
                                id: 'battery_drains_fast',
                                title: 'Battery drains fast',
                                summary: 'Laptop will not last long unplugged.',
                                response: `1. Turn on Battery Saver (2 min, easy)
Expected: Battery time estimate increases.
If yes: You are likely done.
If no: Go to step 2.

2. Close background apps (5 min, easy)
Expected: CPU usage drops and the fan slows.
If yes: Battery life improves.
If no: Go to step 3.

3. Check battery health (5 min, easy)
Expected: The health tool shows normal capacity.
If yes: Battery drain is likely from apps.
If no: The battery may be worn out.

${CAPTURE_STEP}`,
                                tags: ['battery'],
                                links: [
                                    { label: 'Microsoft: Save battery life', url: 'https://support.microsoft.com/search?query=Save%20battery%20life%20Windows' },
                                ],
                            },
                            {
                                id: 'fans_loud_constant',
                                title: 'Fans always loud',
                                summary: 'System sounds busy even when idle.',
                                response: `1. Find the noisy app (3 min, easy)
Expected: One app uses most CPU.
If yes: Close or update that app.
If no: Go to step 2.

2. Switch to Balanced or Quiet mode (2 min, easy)
Expected: Fan noise drops.
If yes: You are done.
If no: Go to step 3.

3. Clear vents and update (10 min, easy)
Expected: Airflow improves and fans slow down.
If yes: You are back to normal.
If no: The device may need a cleaning service.

${CAPTURE_STEP}`,
                                tags: ['fans', 'thermal'],
                                links: [
                                    { label: 'Dell: Reduce fan noise', url: 'https://www.dell.com/support/kbdoc/en-us/000132421/fan-noise-is-loud' },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'connectivity_network',
                        title: 'Wi-Fi and network',
                        summary: 'Internet and connection problems on Windows.',
                        response: `Quick triage: If more than one device is offline, restart the router first. If it is just this PC, pick a topic below.`,
                        tags: ['network', 'wifi'],
                        children: [
                            {
                                id: 'wifi_cant_connect',
                                title: 'Wi-Fi will not connect',
                                summary: 'Password ok but Windows refuses to join.',
                                response: `1. Toggle Wi-Fi and Airplane mode (2 min, easy)
Expected: The network list refreshes.
If yes: Try connecting again.
If no: Go to step 2.

2. Forget and rejoin the network (3 min, easy)
Expected: You can re-enter the Wi-Fi password.
If yes: Test a website.
If no: Go to step 3.

3. Restart the router and PC (5 min, easy)
Expected: The network reconnects after reboot.
If yes: You are back online.
If no: The router or ISP may be down.

${CAPTURE_STEP}`,
                                tags: ['wifi'],
                                links: [
                                    { label: 'Microsoft: Fix Wi-Fi connection issues', url: 'https://support.microsoft.com/search?query=Fix%20Wi-Fi%20connection%20issues%20Windows' },
                                ],
                            },
                            {
                                id: 'wifi_drops_frequently',
                                title: 'Wi-Fi keeps dropping',
                                summary: 'Connection cuts out every few minutes.',
                                response: `1. Improve signal (2 min, easy)
Expected: Signal bars improve.
If yes: Test for 5-10 minutes.
If no: Go to step 2.

2. Update the Wi-Fi adapter (5-10 min, easy)
Expected: Update installs and reconnects.
If yes: Test again.
If no: Go to step 3.

3. Restart the router (5 min, easy)
Expected: All devices reconnect.
If yes: You are stable again.
If no: The router may need service.

${CAPTURE_STEP}`,
                                tags: ['wifi'],
                                links: [
                                    { label: 'Microsoft: Fix network connection issues', url: 'https://support.microsoft.com/search?query=Fix%20network%20connection%20issues%20Windows' },
                                ],
                            },
                            {
                                id: 'ethernet_not_working',
                                title: 'Ethernet not working',
                                summary: 'Cable plugged in but no internet.',
                                response: `1. Swap cable and port (2 min, easy)
Expected: Link light turns on at the port.
If yes: Test a website.
If no: Go to step 2.

2. Disable and re-enable Ethernet (2 min, easy)
Expected: The connection shows as connected.
If yes: Test again.
If no: Go to step 3.

3. Update network drivers (10 min, easy)
Expected: Update installs and reconnects.
If yes: You are back online.
If no: The port or cable may be bad.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If the device is wireless, check batteries first. If it is wired, try another port. Pick a topic below.`,
                        tags: ['input'],
                        children: [
                            {
                                id: 'mouse_keyboard_not_working',
                                title: 'Mouse or keyboard stops responding',
                                summary: 'Either wired or wireless.',
                                response: `1. Reseat or replace batteries (2 min, easy)
Expected: The device wakes up or the cursor moves.
If yes: You are done.
If no: Go to step 2.

2. Try a different USB port (2 min, easy)
Expected: The device works in the new port.
If yes: The original port may be bad.
If no: Go to step 3.

3. Reinstall the device driver (5 min, easy)
Expected: Windows re-detects the device after restart.
If yes: Test again.
If no: The device may be faulty.

${CAPTURE_STEP}`,
                                tags: ['input'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot keyboard and mouse', url: 'https://support.microsoft.com/search?query=Troubleshoot%20keyboard%20and%20mouse%20Windows' },
                                ],
                            },
                            {
                                id: 'touchpad_not_working',
                                title: 'Touchpad not working',
                                summary: 'Cursor frozen on laptops.',
                                response: `1. Toggle the touchpad key (1 min, easy)
Expected: The touchpad starts moving the cursor.
If yes: You are done.
If no: Go to step 2.

2. Toggle touchpad in Settings (2 min, easy)
Expected: The touchpad turns back on.
If yes: Test again.
If no: Go to step 3.

3. Update touchpad driver (10 min, easy)
Expected: Update installs and the touchpad works.
If yes: You are back.
If no: Use a USB mouse and contact support.

${CAPTURE_STEP}`,
                                tags: ['touchpad'],
                                links: [
                                    { label: 'Microsoft: Fix touchpad problems', url: 'https://support.microsoft.com/search?query=Fix%20touchpad%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'sticky_keys_stuck',
                                title: 'Sticky Keys stuck on',
                                summary: 'Popup keeps appearing or keys act odd.',
                                response: `1. Turn it off with Shift (1 min, easy)
Expected: Sticky Keys popup disappears.
If yes: You are done.
If no: Go to step 2.

2. Disable in Settings (2 min, easy)
Expected: Sticky, Filter, and Toggle Keys are off.
If yes: Test the keyboard again.
If no: Go to step 3.

3. Restart the PC (3 min, easy)
Expected: The popup no longer appears.
If yes: You are back to normal.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['accessibility'],
                                links: [
                                    { label: 'Microsoft: Turn off Sticky Keys', url: 'https://support.microsoft.com/search?query=Turn%20off%20Sticky%20Keys%20Windows' },
                                ],
                            },
                            {
                                id: 'usb_drive_not_opening',
                                title: 'USB drive will not open',
                                summary: 'Drive letter missing or access denied.',
                                response: `1. Test another port or PC (3 min, easy)
Expected: The drive shows up on another port or device.
If yes: The original port is likely the issue.
If no: Go to step 2.

2. Assign a drive letter (5 min, easy)
Expected: The drive appears in File Explorer.
If yes: Open the drive and copy your files.
If no: Go to step 3.

3. Run Error Checking (5 min, easy)
Expected: Windows repairs the drive or reports an error.
If yes: Try opening again.
If no: The drive may be failing.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: Keep devices within a few feet and charged. Pick a topic below.`,
                        tags: ['bluetooth', 'audio'],
                        children: [
                            {
                                id: 'bluetooth_not_pairing_simple',
                                title: 'Bluetooth will not pair',
                                summary: 'Devices cannot find each other.',
                                response: `1. Toggle Bluetooth on both devices (2 min, easy)
Expected: Devices appear in the list.
If yes: Try pairing again.
If no: Go to step 2.

2. Remove and re-add the device (3 min, easy)
Expected: Pairing completes without errors.
If yes: Test audio.
If no: Go to step 3.

3. Reduce interference (5 min, easy)
Expected: Pairing succeeds when devices are close.
If yes: You are done.
If no: Update Bluetooth drivers or contact support.

${CAPTURE_STEP}`,
                                tags: ['bluetooth'],
                                links: [
                                    { label: 'Microsoft: Bluetooth help', url: 'https://support.microsoft.com/search?query=Bluetooth%20help%20Windows' },
                                ],
                            },
                            {
                                id: 'headphones_not_recognized',
                                title: 'Headphones not recognized',
                                summary: 'Plugged in but no audio.',
                                response: `1. Select the right output (2 min, easy)
Expected: Sound plays through the headset.
If yes: You are done.
If no: Go to step 2.

2. Disable sound enhancements (3 min, easy)
Expected: Audio plays without distortion.
If yes: You are back.
If no: Go to step 3.

3. Reinstall the headset (5 min, easy)
Expected: Windows detects the headset again.
If yes: Test audio.
If no: The headset may be faulty.

${CAPTURE_STEP}`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Fix sound problems', url: 'https://support.microsoft.com/search?query=Fix%20sound%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'bluetooth_audio_lag',
                                title: 'Bluetooth audio lag',
                                summary: 'Sound delayed behind video.',
                                response: `1. Reconnect the headset (2 min, easy)
Expected: Audio sync improves.
If yes: You are done.
If no: Go to step 2.

2. Disable Hands-Free mode (3 min, easy)
Expected: Audio shifts to high-quality mode.
If yes: Sync improves.
If no: Go to step 3.

3. Update Bluetooth and audio drivers (10 min, easy)
Expected: Updates install and lag improves.
If yes: You are back.
If no: Try wired headphones or contact support.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: Check volume/mute first, then pick the closest match.`,
                        tags: ['audio'],
                        children: [
                            {
                                id: 'audio_wrong_device',
                                title: 'Audio plays through wrong device',
                                summary: 'Sound comes from the monitor or nowhere.',
                                response: `1. Choose the correct output (2 min, easy)
Expected: Sound plays from the right device.
If yes: You are done.
If no: Go to step 2.

2. Set the default device (3 min, easy)
Expected: The correct speaker shows as default.
If yes: Test audio again.
If no: Go to step 3.

3. Reconnect the audio cable (2 min, easy)
Expected: The device appears again.
If yes: Select it as output.
If no: The cable or device may be faulty.

${CAPTURE_STEP}`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Choose sound output', url: 'https://support.microsoft.com/search?query=Choose%20sound%20output%20Windows' },
                                ],
                            },
                            {
                                id: 'no_sound_windows',
                                title: 'No sound at all',
                                summary: 'Windows is completely silent.',
                                response: `1. Check mute and volume (1 min, easy)
Expected: Volume slider is above 0 and not muted.
If yes: Go to step 2.
If no: Raise volume and test again.

2. Run the audio troubleshooter (5 min, easy)
Expected: Windows finds and fixes a sound issue.
If yes: Test audio.
If no: Go to step 3.

3. Update audio drivers (10 min, easy)
Expected: Update installs and sound returns.
If yes: You are back.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['audio'],
                                links: [
                                    { label: 'Microsoft: Fix sound problems', url: 'https://support.microsoft.com/search?query=Fix%20sound%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'microphone_not_working_simple',
                                title: 'Microphone not working',
                                summary: 'Apps cannot hear you.',
                                response: `1. Allow mic access (2 min, easy)
Expected: The app shows the mic is allowed.
If yes: Test again.
If no: Go to step 2.

2. Pick the correct input (2 min, easy)
Expected: The mic level meter moves when you speak.
If yes: You are done.
If no: Go to step 3.

3. Turn off Exclusive mode (3 min, easy)
Expected: The mic works in your app.
If yes: You are back.
If no: Try a different mic if available.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: Power cycle the device first, then pick the closest match.`,
                        tags: ['peripherals'],
                        children: [
                            {
                                id: 'webcam_not_detected_simple',
                                title: 'Webcam not detected',
                                summary: 'Missing in Teams/Zoom.',
                                response: `1. Close other apps (2 min, easy)
Expected: The camera appears in your meeting app.
If yes: You are done.
If no: Go to step 2.

2. Allow camera access (2 min, easy)
Expected: The camera appears in app permissions.
If yes: Test again.
If no: Go to step 3.

3. Update camera driver (10 min, easy)
Expected: Update installs and camera shows up.
If yes: You are back.
If no: Try another USB port or contact support.

${CAPTURE_STEP}`,
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
                                response: `1. Power cycle printer and PC (5 min, easy)
Expected: The printer shows Ready.
If yes: Try printing again.
If no: Go to step 2.

2. Clear the print queue (3 min, easy)
Expected: Stuck jobs clear out.
If yes: Print a test page.
If no: Go to step 3.

3. Reinstall the printer (10 min, easy)
Expected: The printer installs and prints.
If yes: You are back.
If no: The printer may need service.

${CAPTURE_STEP}`,
                                tags: ['printer'],
                                links: [
                                    { label: 'Microsoft: Fix printer problems', url: 'https://support.microsoft.com/search?query=Fix%20printer%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'password_prompt_loop',
                                title: 'Password prompt loop when printing/sharing',
                                summary: 'Windows keeps asking for credentials.',
                                response: `1. Clear saved credentials (3 min, easy)
Expected: The saved entry disappears.
If yes: Go to step 2.
If no: Restart and try again.

2. Re-add the printer/share (5 min, easy)
Expected: You sign in once and it stays signed in.
If yes: You are done.
If no: Go to step 3.

3. Restart the PC (3 min, easy)
Expected: The prompt stops looping.
If yes: You are back.
If no: Contact support to reset the service.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If the screen is blank, use the "Black screen" topic. Otherwise pick the closest match.`,
                        tags: ['display'],
                        children: [
                            {
                                id: 'auto_brightness_annoying',
                                title: 'Auto brightness too aggressive',
                                summary: 'Screen constantly dims.',
                                response: `1. Turn off auto brightness (2 min, easy)
Expected: Brightness stays steady.
If yes: You are done.
If no: Go to step 2.

2. Update display drivers (10 min, easy)
Expected: Updates install without errors.
If yes: Test again.
If no: Go to step 3.

3. Check maker settings (5 min, easy)
Expected: Adaptive brightness is disabled.
If yes: Brightness stays stable.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Change screen brightness', url: 'https://support.microsoft.com/search?query=Change%20screen%20brightness%20Windows' },
                                ],
                            },
                            {
                                id: 'external_monitor_missing',
                                title: 'External monitor not detected',
                                summary: 'Second screen stays blank.',
                                response: `1. Switch display mode (2 min, easy)
Expected: The second screen appears.
If yes: You are done.
If no: Go to step 2.

2. Reseat cable and power (3 min, easy)
Expected: The monitor shows an image or menu.
If yes: Test again.
If no: Go to step 3.

3. Update display drivers (10 min, easy)
Expected: Updates install and the monitor appears.
If yes: You are back.
If no: Try another cable or port.

${CAPTURE_STEP}`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Fix connections to external displays', url: 'https://support.microsoft.com/search?query=Fix%20connections%20to%20external%20displays%20Windows' },
                                ],
                            },
                            {
                                id: 'screen_rotation_stuck',
                                title: 'Screen rotation stuck',
                                summary: 'Tablet mode locked at wrong angle.',
                                response: `1. Turn off Rotation Lock (2 min, easy)
Expected: The screen rotates when you tilt.
If yes: You are done.
If no: Go to step 2.

2. Re-seat keyboard or restart (3 min, easy)
Expected: Rotation works after restart.
If yes: You are back.
If no: Go to step 3.

3. Update device drivers (10 min, easy)
Expected: Updates install and rotation works.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Rotate the screen', url: 'https://support.microsoft.com/search?query=Rotate%20the%20screen%20Windows' },
                                ],
                            },
                            {
                                id: 'night_light_not_working',
                                title: 'Night light not working',
                                summary: 'Blue light filter never turns on.',
                                response: `1. Toggle Night light (2 min, easy)
Expected: The screen color changes warmer.
If yes: You are done.
If no: Go to step 2.

2. Close color-changing apps (3 min, easy)
Expected: Night light works after closing apps.
If yes: You are back.
If no: Go to step 3.

3. Update and restart (10 min, easy)
Expected: Night light works after reboot.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['display'],
                                links: [
                                    { label: 'Microsoft: Use Night light', url: 'https://support.microsoft.com/search?query=Use%20Night%20light%20Windows' },
                                ],
                            },
                            {
                                id: 'screensaver_wont_turn_off',
                                title: 'Screensaver will not turn off',
                                summary: 'Kicks in while you are active.',
                                response: `1. Change screen saver settings (3 min, easy)
Expected: The screen saver no longer interrupts.
If yes: You are done.
If no: Go to step 2.

2. Check stuck inputs (3 min, easy)
Expected: The screen saver stops triggering.
If yes: You are back.
If no: Go to step 3.

3. Restart the PC (3 min, easy)
Expected: The behavior stops.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['personalization'],
                                links: [
                                    { label: 'Microsoft: Change screen saver', url: 'https://support.microsoft.com/search?query=Change%20screen%20saver%20Windows' },
                                ],
                            },
                            {
                                id: 'cant_change_wallpaper',
                                title: 'Cannot change wallpaper',
                                summary: 'Options greyed out.',
                                response: `1. Check Windows activation (2 min, easy)
Expected: Windows shows as activated.
If yes: Go to step 2.
If no: Activate Windows first.

2. Set a background image (2 min, easy)
Expected: The wallpaper changes.
If yes: You are done.
If no: Go to step 3.

3. Check work/school rules (2 min, easy)
Expected: You see a policy notice if locked.
If yes: Contact your admin.
If no: Try a different image file.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If storage is in the red, start with "Storage almost full."`,
                        tags: ['storage', 'files'],
                        children: [
                            {
                                id: 'storage_almost_full',
                                title: 'Storage almost full',
                                summary: 'Drive in the red zone.',
                                response: `1. Run Storage cleanup (5 min, easy)
Expected: Several GB are freed.
If yes: Go to step 2.
If no: Go to step 2 anyway.

2. Move large files (10 min, easy)
Expected: The drive is no longer in the red.
If yes: You are done.
If no: Go to step 3.

3. Uninstall unused apps (10 min, easy)
Expected: More space is freed.
If yes: You are back.
If no: You may need external storage.

${CAPTURE_STEP}`,
                                tags: ['storage'],
                                links: [
                                    { label: 'Microsoft: Free up drive space', url: 'https://support.microsoft.com/search?query=Free%20up%20drive%20space%20Windows' },
                                ],
                            },
                            {
                                id: 'cant_download_browser',
                                title: 'Browser will not download files',
                                summary: 'Downloads fail or vanish.',
                                response: `1. Check storage and Downloads folder (3 min, easy)
Expected: The file appears in Downloads.
If yes: You are done.
If no: Go to step 2.

2. Change download location (3 min, easy)
Expected: The file saves to the new folder.
If yes: You are back.
If no: Go to step 3.

3. Restart the browser and PC (5 min, easy)
Expected: Downloads work after restart.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot downloads in Edge', url: 'https://support.microsoft.com/search?query=Troubleshoot%20downloads%20in%20Edge%20Windows' },
                                ],
                            },
                            {
                                id: 'zip_wont_open',
                                title: 'ZIP file will not open',
                                summary: 'Windows reports errors.',
                                response: `1. Extract to a new folder (2 min, easy)
Expected: Files extract without errors.
If yes: You are done.
If no: Go to step 2.

2. Try another unzip tool (5 min, easy)
Expected: The ZIP opens successfully.
If yes: You are back.
If no: Go to step 3.

3. Ask for a new copy (2 min, easy)
Expected: A fresh ZIP opens correctly.
If yes: You are done.
If no: The file may be corrupted.

${CAPTURE_STEP}`,
                                tags: ['files'],
                                links: [
                                    { label: 'Microsoft: Zip and unzip files', url: 'https://support.microsoft.com/search?query=Zip%20and%20unzip%20files%20Windows' },
                                ],
                            },
                            {
                                id: 'file_association_wrong',
                                title: 'Wrong app opens files',
                                summary: 'Need to reset defaults.',
                                response: `1. Use Open with (2 min, easy)
Expected: The file opens in the correct app.
If yes: You are done.
If no: Go to step 2.

2. Set default apps (3 min, easy)
Expected: The app is set as default.
If yes: Open the file again.
If no: Go to step 3.

3. Reinstall the app (10 min, easy)
Expected: The app opens files normally.
If yes: You are back.
If no: Contact support.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If the whole desktop freezes, start with "Taskbar frozen."`,
                        tags: ['apps'],
                        children: [
                            {
                                id: 'file_explorer_not_responding',
                                title: 'File Explorer not responding',
                                summary: 'Explorer hangs or crashes.',
                                response: `1. Restart Windows Explorer (2 min, easy)
Expected: The taskbar and windows refresh.
If yes: Test File Explorer again.
If no: Go to step 2.

2. Clear Quick Access history (3 min, easy)
Expected: File Explorer opens normally.
If yes: You are back.
If no: Go to step 3.

3. Install Windows updates (10 min, easy)
Expected: Updates install and Explorer improves.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['explorer'],
                                links: [
                                    { label: 'Microsoft: File Explorer help', url: 'https://support.microsoft.com/search?query=File%20Explorer%20help%20Windows' },
                                ],
                            },
                            {
                                id: 'microsoft_store_install_fail',
                                title: 'Microsoft Store cannot install apps',
                                summary: 'Downloads stuck at pending.',
                                response: `1. Sign out/in of Store (3 min, easy)
Expected: Store opens normally.
If yes: Try the install again.
If no: Go to step 2.

2. Restart the PC (3 min, easy)
Expected: Downloads resume.
If yes: You are done.
If no: Go to step 3.

3. Check time and storage (3 min, easy)
Expected: Time is correct and you have space.
If yes: Try again.
If no: Fix time or free space.

${CAPTURE_STEP}`,
                                tags: ['store'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot Microsoft Store', url: 'https://support.microsoft.com/search?query=Troubleshoot%20Microsoft%20Store%20Windows' },
                                ],
                            },
                            {
                                id: 'store_icons_missing',
                                title: 'Store apps missing icons',
                                summary: 'Start menu tiles blank.',
                                response: `1. Reinstall the app (5 min, easy)
Expected: Icons return after reinstall.
If yes: You are done.
If no: Go to step 2.

2. Run Store troubleshooter (5 min, easy)
Expected: Troubleshooter reports a fix.
If yes: Restart and test.
If no: Go to step 3.

3. Restart the PC (3 min, easy)
Expected: Icons return after reboot.
If yes: You are back.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['store'],
                                links: [
                                    { label: 'Microsoft: Troubleshoot Microsoft Store', url: 'https://support.microsoft.com/search?query=Troubleshoot%20Microsoft%20Store%20Windows' },
                                ],
                            },
                            {
                                id: 'taskbar_frozen',
                                title: 'Taskbar frozen or missing icons',
                                summary: 'Taskbar stops responding.',
                                response: `1. Restart Windows Explorer (2 min, easy)
Expected: Taskbar responds again.
If yes: You are done.
If no: Go to step 2.

2. Restart the PC (3 min, easy)
Expected: Taskbar loads normally.
If yes: You are back.
If no: Go to step 3.

3. Install Windows updates (10 min, easy)
Expected: Updates install and taskbar improves.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['taskbar'],
                                links: [
                                    { label: 'Microsoft: Fix taskbar problems', url: 'https://support.microsoft.com/search?query=Fix%20taskbar%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'start_menu_not_opening',
                                title: 'Start menu not opening',
                                summary: 'Button does nothing.',
                                response: `1. Restart the PC (3 min, easy)
Expected: Start menu opens after reboot.
If yes: You are done.
If no: Go to step 2.

2. Install Windows updates (10 min, easy)
Expected: Updates install and Start works.
If yes: You are back.
If no: Go to step 3.

3. Test a new user account (10 min, easy)
Expected: Start works in the new account.
If yes: Your profile may be corrupted.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['start menu'],
                                links: [
                                    { label: 'Microsoft: Fix Start menu', url: 'https://support.microsoft.com/search?query=Fix%20Start%20menu%20Windows' },
                                ],
                            },
                            {
                                id: 'cortana_search_not_working',
                                title: 'Search or Cortana not finding files',
                                summary: 'Results stay blank.',
                                response: `1. Restart the PC (3 min, easy)
Expected: Search returns results.
If yes: You are done.
If no: Go to step 2.

2. Run Search troubleshooter (5 min, easy)
Expected: Troubleshooter reports a fix.
If yes: Test search again.
If no: Go to step 3.

3. Update Windows (10 min, easy)
Expected: Updates install and search improves.
If yes: You are back.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['search'],
                                links: [
                                    { label: 'Microsoft: Fix search problems', url: 'https://support.microsoft.com/search?query=Fix%20search%20problems%20Windows' },
                                ],
                            },
                            {
                                id: 'time_date_incorrect',
                                title: 'Time and date incorrect',
                                summary: 'Clock drifts or shows the wrong zone.',
                                response: `1. Sync the clock (2 min, easy)
Expected: Time updates immediately.
If yes: You are done.
If no: Go to step 2.

2. Enable automatic time (2 min, easy)
Expected: Time stays correct.
If yes: You are back.
If no: Go to step 3.

3. Set the time zone manually (2 min, easy)
Expected: The correct zone is selected.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['time'],
                                links: [
                                    { label: 'Microsoft: Synchronize your clock', url: 'https://support.microsoft.com/search?query=Synchronize%20your%20clock%20Windows' },
                                ],
                            },
                            {
                                id: 'too_many_notifications',
                                title: 'Too many notifications',
                                summary: 'Action Center overwhelmed.',
                                response: `1. Silence noisy apps (3 min, easy)
Expected: Fewer pop-ups appear.
If yes: You are done.
If no: Go to step 2.

2. Turn on Focus Assist (2 min, easy)
Expected: Notifications pause during work time.
If yes: You are back.
If no: Go to step 3.

3. Disable tips and suggestions (2 min, easy)
Expected: Tips stop showing.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['notifications'],
                                links: [
                                    { label: 'Microsoft: Change notification settings', url: 'https://support.microsoft.com/search?query=Change%20notification%20settings%20Windows' },
                                ],
                            },
                            {
                                id: 'clipboard_history_not_working',
                                title: 'Clipboard history not working',
                                summary: 'Win(logo) + V does nothing.',
                                response: `1. Enable Clipboard history (2 min, easy)
Expected: Win + V opens clipboard history.
If yes: You are done.
If no: Go to step 2.

2. Restart the PC (3 min, easy)
Expected: Clipboard history works after reboot.
If yes: You are back.
If no: Go to step 3.

3. Sign in to Microsoft account (3 min, easy)
Expected: Clipboard sync is available.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If only one site is slow, it may be that site. Pick the closest match below.`,
                        tags: ['browser', 'email'],
                        children: [
                            {
                                id: 'browser_slow',
                                title: 'Edge/Chrome running slow',
                                summary: 'Tabs take forever.',
                                response: `1. Close tabs and extensions (3 min, easy)
Expected: The browser feels faster.
If yes: You are done.
If no: Go to step 2.

2. Clear browsing data (3 min, easy)
Expected: Pages load faster.
If yes: You are back.
If no: Go to step 3.

3. Restart or reset the browser (5 min, easy)
Expected: Browser performance improves.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Improve browser performance', url: 'https://support.microsoft.com/search?query=Improve%20browser%20performance%20Windows' },
                                ],
                            },
                            {
                                id: 'browser_homepage_hijacked',
                                title: 'Browser homepage hijacked',
                                summary: 'Unknown search takes over.',
                                response: `1. Reset browser settings (3 min, easy)
Expected: Homepage returns to normal.
If yes: You are done.
If no: Go to step 2.

2. Remove unknown extensions (3 min, easy)
Expected: The unwanted search is gone.
If yes: You are back.
If no: Go to step 3.

3. Run a security scan (10 min, easy)
Expected: Threats are removed.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['browser'],
                                links: [
                                    { label: 'Microsoft: Remove pop-ups, redirects, malware', url: 'https://support.microsoft.com/search?query=Remove%20pop-ups%2C%20redirects%2C%20malware%20Windows' },
                                ],
                            },
                            {
                                id: 'outlook_not_syncing',
                                title: 'Outlook will not send/receive',
                                summary: 'Mail stuck in Outbox.',
                                response: `1. Turn off Work Offline (2 min, easy)
Expected: Outlook starts syncing.
If yes: You are done.
If no: Go to step 2.

2. Re-enter your password (3 min, easy)
Expected: Mail starts sending again.
If yes: You are back.
If no: Go to step 3.

3. Repair the Outlook profile (10 min, easy)
Expected: Outlook syncs without errors.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
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
                        response: `Quick triage: If this affects more than one device, check your account status first. Pick the closest match below.`,
                        tags: ['accounts'],
                        children: [
                            {
                                id: 'microsoft_password_beginner',
                                title: 'Forgot Microsoft account password',
                                summary: 'Need to reset at account.live.com.',
                                response: `1. Start the reset (3 min, easy)
Expected: You see verification options.
If yes: Go to step 2.
If no: Double-check the email or phone number.

2. Verify your identity (3 min, easy)
Expected: The code is accepted.
If yes: Set a new password.
If no: Use a different verification method.

3. Update recovery info (3 min, easy)
Expected: Recovery phone or email is saved.
If yes: Sign back in on your apps.
If no: Save it later but keep it in mind.

${CAPTURE_STEP}`,
                                tags: ['accounts'],
                            },
                            {
                                id: 'onedrive_not_syncing_simple',
                                title: 'OneDrive not syncing',
                                summary: 'Cloud icon shows an error.',
                                response: `1. Pause and resume sync (2 min, easy)
Expected: The sync icon changes to normal.
If yes: You are done.
If no: Go to step 2.

2. Check account and storage (3 min, easy)
Expected: You have space and the right account.
If yes: Sync resumes.
If no: Free space or sign in again.

3. Unlink and relink OneDrive (5 min, easy)
Expected: Sync starts fresh without errors.
If yes: You are back.
If no: Contact support.

${CAPTURE_STEP}`,
                                tags: ['onedrive'],
                            },
                            {
                                id: 'parental_controls_blocking',
                                title: 'Parental controls blocking sites',
                                summary: 'Family Safety too strict.',
                                response: `1. Open Family Safety settings (5 min, easy)
Expected: You can edit the child's settings.
If yes: Go to step 2.
If no: Sign in with the organizer account.

2. Adjust web filters (5 min, easy)
Expected: The blocked site is allowed.
If yes: Go to step 3.
If no: Add the site to the allow list.

3. Sync the child's device (3 min, easy)
Expected: Changes apply within a few minutes.
If yes: You are done.
If no: Restart the child's device.

${CAPTURE_STEP}`,
                                tags: ['family'],
                                links: [
                                    { label: 'Microsoft: Adjust Family Safety settings', url: 'https://support.microsoft.com/search?query=Adjust%20Family%20Safety%20settings%20Windows' },
                                ],
                            },
                            {
                                id: 'backup_reminder_annoying',
                                title: 'Backup reminders annoying',
                                summary: 'Constant prompts for OneDrive/File History.',
                                response: `1. Decide if you want backups (2 min, easy)
Expected: You know if you will use OneDrive/File History.
If yes: Go to step 2.
If no: Go to step 2 anyway.

2. Turn off or pause backup reminders (3 min, easy)
Expected: The prompts stop.
If yes: You are done.
If no: Go to step 3.

3. Schedule backups (5 min, easy)
Expected: Backups run at a convenient time.
If yes: Prompts become less frequent.
If no: Contact support.

${CAPTURE_STEP}`,
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
                        response: `1. Restart and try again (5-10 min, easy)
Expected: Updates start downloading.
If yes: Let them finish and restart.
If no: Go to step 2.

2. Run the Update troubleshooter (5 min, easy)
Expected: Troubleshooter reports a fix.
If yes: Check for updates again.
If no: Go to step 3.

3. Free up space (10 min, easy)
Expected: You have at least 20 GB free.
If yes: Try the update again.
If no: Move large files or uninstall apps.

${CAPTURE_STEP}`,
                        tags: ['windows', 'updates'],
                        links: [
                            { label: 'Microsoft support article', url: 'https://support.microsoft.com/search?query=Microsoft%20support%20article%20Windows' }
                        ]
                    },
                    {
                        id: 'office_password',
                        title: 'Reset Microsoft / Office password',
                        summary: 'Account.live.com reset flow.',
                        response: `1. Start the reset (3 min, easy)
Expected: You see verification options.
If yes: Go to step 2.
If no: Double-check the email or phone number.

2. Verify and set a new password (3 min, easy)
Expected: The reset completes and you can sign in.
If yes: Go to step 3.
If no: Try a different verification method.

3. Update recovery info (3 min, easy)
Expected: Recovery phone or email is saved.
If yes: Sign back in to Outlook, Teams, and OneDrive.
If no: Add recovery info later.

${CAPTURE_STEP}`,
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
                        response: `1. Pick the right devices in Teams (3 min, easy)
Expected: The test call works.
If yes: You are done.
If no: Go to step 2.

2. Close other apps and restart Teams (3 min, easy)
Expected: The mic/cam works after restart.
If yes: You are back.
If no: Go to step 3.

3. Update Teams (5 min, easy)
Expected: Update installs and devices work.
If yes: You are done.
If no: Contact support.

${CAPTURE_STEP}`,
                        tags: ['teams', 'meetings'],
                        links: [
                            { label: 'Teams troubleshooting video', url: 'https://www.youtube.com/watch?v=Tzo3BLYgj3U' }
                        ]
                    }
                ]
            },
            {
                id: 'apple_ios_mac',
                title: 'Apple iPhone, iPad, or Mac',
                summary: 'Apple ID, iPhone power, or Mac performance.',
                response: `Quick triage: If more than one Apple device is affected, check Wi-Fi or Apple ID first. If anything feels unsafe, stop and get help.`,
                tags: ['apple'],
                children: [
                    {
                        id: 'apple_id',
                        title: 'Forgot Apple ID password',
                        summary: 'iforgot.apple.com recovery.',
                        response: `1. Start the reset (3 min, easy)
Expected: You see verification options.
If yes: Go to step 2.
If no: Double-check the Apple ID email or phone.

2. Verify your identity (3 min, easy)
Expected: The code is accepted.
If yes: Set a new password.
If no: Try a different verification method.

3. Update trusted info (3 min, easy)
Expected: A trusted phone/email is saved.
If yes: Sign back in on your devices.
If no: Add it later.

${CAPTURE_STEP}`,
                        tags: ['apple id', 'security'],
                        links: [
                            { label: 'Apple walkthrough (video)', url: 'https://www.youtube.com/watch?v=4w37whqIAJ0' }
                        ]
                    },
                    {
                        id: 'iphone_power',
                        title: 'iPhone or iPad will not power on',
                        summary: 'Force restart + charging checks.',
                        response: `1. Force restart (2 min, easy)
Expected: Apple logo appears.
If yes: Let it boot fully.
If no: Go to step 2.

2. Charge with known-good cable (15 min, easy)
Expected: Charging icon appears.
If yes: Leave it charging longer.
If no: Go to step 3.

3. Connect to a computer (10 min, easy)
Expected: Finder/iTunes sees the device.
If yes: Update or restore.
If no: The device may need repair.

${CAPTURE_STEP}`,
                        tags: ['ios', 'power'],
                        links: [
                            { label: 'Apple support video', url: 'https://www.youtube.com/watch?v=bwjcYyCneNc' }
                        ]
                    },
                    {
                        id: 'iphone_wifi',
                        title: 'iPhone Wi-Fi will not connect',
                        summary: 'Forget network, toggle radios.',
                        response: `1. Toggle Airplane mode and Wi-Fi (2 min, easy)
Expected: The network list refreshes.
If yes: Try to connect again.
If no: Go to step 2.

2. Forget and rejoin the network (3 min, easy)
Expected: You can re-enter the Wi-Fi password.
If yes: Test a website.
If no: Go to step 3.

3. Restart phone and router (5 min, easy)
Expected: Wi-Fi reconnects after reboot.
If yes: You are back online.
If no: Reset network settings.

${CAPTURE_STEP}`,
                        tags: ['ios', 'wifi'],
                        links: [
                            { label: 'Apple Wi-Fi basics', url: 'https://support.apple.com/HT202639' }
                        ]
                    },
                    {
                        id: 'iphone_storage',
                        title: 'iPhone storage is full',
                        summary: 'Offload apps and clear media.',
                        response: `1. Use iPhone Storage (5 min, easy)
Expected: You see the biggest apps and files.
If yes: Offload unused apps.
If no: Go to step 2.

2. Clear large media (10 min, easy)
Expected: Several GB are freed.
If yes: You are done.
If no: Go to step 3.

3. Delete old messages and Safari data (5 min, easy)
Expected: Storage increases again.
If yes: You are back.
If no: Consider iCloud or external storage.

${CAPTURE_STEP}`,
                        tags: ['ios', 'storage'],
                        links: [
                            { label: 'Apple storage tips', url: 'https://support.apple.com/HT201656' }
                        ]
                    },
                    {
                        id: 'mac_performance',
                        title: 'Mac running hot or slow',
                        summary: 'Safe Mode, Activity Monitor, updates.',
                        response: `1. Restart and check Activity Monitor (5 min, easy)
Expected: One app stands out using high CPU.
If yes: Quit or update that app.
If no: Go to step 2.

2. Update macOS (15-30 min, easy)
Expected: Update installs and performance improves.
If yes: You are done.
If no: Go to step 3.

3. Run Apple Diagnostics (10 min, easy)
Expected: No hardware errors are found.
If yes: The issue is likely software.
If no: Contact Apple Support.

${CAPTURE_STEP}`,
                        tags: ['mac', 'performance'],
                        links: [
                            { label: 'Apple diagnostics article', url: 'https://support.apple.com/en-us/HT201262' }
                        ]
                    }
                ]
            },
            {
                id: 'android_google',
                title: 'Android phone or tablet',
                summary: 'Charging, storage, apps, or Google account help.',
                response: `Quick triage: If more than one device is affected, check Wi-Fi or Google services first. If anything feels unsafe, stop and get help.`,
                tags: ['android', 'google'],
                children: [
                    {
                        id: 'android_power',
                        title: 'Android phone/tablet will not charge',
                        summary: 'Force restart + port care.',
                        response: `1. Force restart (2 min, easy)
Expected: The device restarts or shows a logo.
If yes: Try charging again.
If no: Go to step 2.

2. Try a different charger (5 min, easy)
Expected: Charging icon appears.
If yes: Leave it charging for 15 minutes.
If no: Go to step 3.

3. Check the port and cable (5 min, easy)
Expected: A snug fit and no debris.
If yes: Test charging again.
If no: The port may need service.

${CAPTURE_STEP}`,
                        tags: ['android', 'power'],
                        links: [
                            { label: 'Google support: battery tips', url: 'https://support.google.com/android/answer/7664692' }
                        ]
                    },
                    {
                        id: 'android_wifi',
                        title: 'Android Wi-Fi will not connect',
                        summary: 'Forget network + airplane toggle.',
                        response: `1. Toggle Airplane mode and Wi-Fi (2 min, easy)
Expected: The network list refreshes.
If yes: Try connecting again.
If no: Go to step 2.

2. Forget and rejoin the network (3 min, easy)
Expected: You can re-enter the Wi-Fi password.
If yes: Test a website.
If no: Go to step 3.

3. Restart phone and router (5 min, easy)
Expected: Wi-Fi reconnects after reboot.
If yes: You are back online.
If no: Reset Wi-Fi, mobile, and Bluetooth settings.

${CAPTURE_STEP}`,
                        tags: ['android', 'wifi'],
                        links: [
                            { label: 'Android Wi-Fi help', url: 'https://support.google.com/android/answer/9075847' }
                        ]
                    },
                    {
                        id: 'google_account',
                        title: 'Google account recovery',
                        summary: 'accounts.google.com/signin/recovery',
                        response: `1. Start the recovery (3 min, easy)
Expected: You see verification options.
If yes: Go to step 2.
If no: Double-check the email or phone number.

2. Verify your identity (3 min, easy)
Expected: The code is accepted.
If yes: Set a new password.
If no: Try a different verification method.

3. Update recovery info (3 min, easy)
Expected: Recovery phone/email is saved.
If yes: Review security settings.
If no: Add it later.

${CAPTURE_STEP}`,
                        tags: ['google', 'security'],
                        links: [
                            { label: 'Video walkthrough', url: 'https://www.youtube.com/watch?v=pvx6_FqfrwE' }
                        ]
                    },
                    {
                        id: 'android_storage',
                        title: 'Android storage is full',
                        summary: 'Files by Google cleanup.',
                        response: `1. Clean with Files by Google (5 min, easy)
Expected: Several GB are freed.
If yes: You are done.
If no: Go to step 2.

2. Move large media (10 min, easy)
Expected: Storage space increases.
If yes: You are back.
If no: Go to step 3.

3. Remove unused apps (5 min, easy)
Expected: Storage is no longer full.
If yes: You are done.
If no: Add an SD card or cloud storage.

${CAPTURE_STEP}`,
                        tags: ['android', 'storage'],
                        links: [
                            { label: 'Files by Google video', url: 'https://www.youtube.com/watch?v=lAnqp7VJ-c0' }
                        ]
                    },
                    {
                        id: 'android_apps_crashing',
                        title: 'Apps keep crashing (Android)',
                        summary: 'Update + clear cache.',
                        response: `1. Update all apps (5-10 min, easy)
Expected: Updates finish without errors.
If yes: Test the app again.
If no: Go to step 2.

2. Clear the app cache (3 min, easy)
Expected: The app opens without crashing.
If yes: You are back.
If no: Go to step 3.

3. Reinstall the app (5 min, easy)
Expected: The app runs normally.
If yes: You are done.
If no: The app may have a bug.

${CAPTURE_STEP}`,
                        tags: ['android', 'apps'],
                        links: [
                            { label: 'Google Play help', url: 'https://support.google.com/googleplay/answer/7513003' }
                        ]
                    }
                ]
            },
            {
                id: 'network_wifi',
                title: 'Home Wi-Fi or internet',
                summary: 'Whole-home outages, dropouts, and router setup.',
                response: `Quick triage: If only one device is affected, choose that device type instead. Otherwise pick a network topic below.`,
                tags: ['network'],
                children: [
                    {
                        id: 'wifi_down',
                        title: 'Home Wi-Fi is down',
                        summary: 'Power-cycle ISP modem + router.',
                        response: `1. Power cycle modem and router (5 min, easy)
Expected: Modem lights return to normal.
If yes: Go to step 2.
If no: Contact your ISP.

2. Reconnect devices to Wi-Fi (5 min, easy)
Expected: Devices reconnect and browse.
If yes: You are back online.
If no: Go to step 3.

3. Update router firmware (10 min, easy)
Expected: Update completes without errors.
If yes: Test again.
If no: The router may need service.

${CAPTURE_STEP}`,
                        tags: ['network', 'wifi'],
                        links: [
                            { label: 'NETGEAR firmware guide', url: 'https://kb.netgear.com/23442/How-do-I-update-the-firmware-on-my-NETGEAR-router-with-a-web-browser' }
                        ]
                    },
                    {
                        id: 'wifi_dropping',
                        title: 'Wi-Fi keeps dropping',
                        summary: 'Separate bands + optimize channels.',
                        response: `1. Improve router placement (5 min, easy)
Expected: Signal strength improves.
If yes: Test for 10 minutes.
If no: Go to step 2.

2. Use the best band (3 min, easy)
Expected: Fewer dropouts on 5 GHz nearby or 2.4 GHz farther away.
If yes: You are stable.
If no: Go to step 3.

3. Restart and update the router (10 min, easy)
Expected: Dropouts decrease.
If yes: You are back.
If no: Consider a mesh system.

${CAPTURE_STEP}`,
                        tags: ['wifi'],
                        links: [
                            { label: 'TP-Link Deco playlist', url: 'https://www.youtube.com/playlist?list=PLW_5HFrpMZg9QJVdT1Tzm4NC-PbFY7NgI' }
                        ]
                    },
                    {
                        id: 'router_setup',
                        title: 'New router setup',
                        summary: 'Out-of-box hardening.',
                        response: `1. Connect and access setup (5 min, easy)
Expected: The setup page or app opens.
If yes: Go to step 2.
If no: Double-check the WAN port and cables.

2. Set Wi-Fi name and password (5 min, easy)
Expected: Devices can join the new Wi-Fi.
If yes: Go to step 3.
If no: Try a simpler Wi-Fi name/password.

3. Secure and update the router (10 min, easy)
Expected: Firmware update completes and WPS is off.
If yes: You are done.
If no: Contact your ISP or router support.

${CAPTURE_STEP}`,
                        tags: ['router'],
                        links: [
                            { label: 'Video: NETGEAR setup', url: 'https://www.youtube.com/watch?v=-wkSaOJi2k4' }
                        ]
                    }
                ]
            },
            {
                id: 'hardware_accessories',
                title: 'Printers and accessories',
                summary: 'Printers, webcams, Bluetooth peripherals.',
                response: `Quick triage: Check power and cables first. If more than one accessory is failing, restart the PC and try a different port.`,
                tags: ['peripherals'],
                children: [
                    {
                        id: 'printer_offline',
                        title: 'Printer shows offline',
                        summary: 'Power cycle + reinstall drivers.',
                        response: `1. Power cycle printer and PC (5 min, easy)
Expected: Printer shows Ready.
If yes: Try printing again.
If no: Go to step 2.

2. Confirm the connection (3 min, easy)
Expected: Printer and PC are on the same Wi-Fi or USB.
If yes: Go to step 3.
If no: Reconnect Wi-Fi or cable.

3. Clear queue and reinstall (10 min, easy)
Expected: The printer installs and prints a test page.
If yes: You are back.
If no: The printer may need service.

${CAPTURE_STEP}`,
                        tags: ['printer'],
                        links: [
                            { label: 'HP support video', url: 'https://www.youtube.com/watch?v=kdCJdQ0kGFM' }
                        ]
                    },
                    {
                        id: 'webcam_missing',
                        title: 'Webcam not detected',
                        summary: 'Privacy + driver check.',
                        response: `1. Close other apps (2 min, easy)
Expected: The camera appears in your app.
If yes: You are done.
If no: Go to step 2.

2. Allow camera access (3 min, easy)
Expected: Camera permission is enabled.
If yes: Test again.
If no: Go to step 3.

3. Try another USB port (3 min, easy)
Expected: The camera appears on the new port.
If yes: You are back.
If no: The camera may be faulty.

${CAPTURE_STEP}`,
                        tags: ['webcam'],
                        links: [
                            { label: 'Microsoft support video', url: 'https://www.youtube.com/watch?v=Jv2d3Y17Sqs' }
                        ]
                    },
                    {
                        id: 'bluetooth_pairing',
                        title: 'Bluetooth device will not pair',
                        summary: 'Forget + re-add, clear interference.',
                        response: `1. Toggle Bluetooth and re-pair (3 min, easy)
Expected: The device appears and pairs.
If yes: You are done.
If no: Go to step 2.

2. Charge and move closer (3 min, easy)
Expected: Pairing succeeds within a few feet.
If yes: You are back.
If no: Go to step 3.

3. Clear old Bluetooth entries (5 min, easy)
Expected: The device pairs cleanly.
If yes: You are done.
If no: The accessory may need service.

${CAPTURE_STEP}`,
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
            const endpoint = 'https://api.counterapi.dev/v1/tylerbailey216-techsupportbro1/visits/up';
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
                const key = 'tsb_visit_count_local';
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
        
        // Replace "Choose a Help Topic" with image (zoom: 40%, centered, with hover effects)
        if (node.title === 'Choose a Help Topic') {
            els.title.innerHTML = '<img src="./chooseahelptopic.png" alt="Choose a Help Topic" class="help-topic-image">';
        } else {
            els.title.textContent = node.title;
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
        breadcrumb: "Tell 'G' What's Happening",
        title: 'Choose a Help Topic',
        summary: 'Click "Start troubleshooting" to begin.',
        response: 'Pick a lane above to load your first branch.'
    }];
    render();

    // Affirmations / virtual phone loop
    (() => {
        const affirmations = [
            { tag: 'Grounding', text: 'Your calm is contagious.', source: '- Message from G' },
            { tag: 'Momentum', text: 'Tiny fixes stack up. Keep going.', source: '- Message from G' },
            { tag: 'Breather', text: 'Pause, sip water, then solve.', source: '- Message from G' },
            { tag: 'Clarity', text: 'One step, then the next. You got this.', source: '- Message from G' },
            { tag: 'Focus', text: 'Mute the noise. Fix the signal.', source: '- Message from G' },
        ];
        const tagEl = document.getElementById('affirmationTag');
        const textEl = document.getElementById('affirmationText');
        const srcEl = document.getElementById('affirmationSource');
        const timeEl = document.getElementById('affirmationTime');
        const tickerEl = document.getElementById('affirmationTicker');
        const nextBtn = document.getElementById('affirmationNext');
        let idx = 0;

        const updateTime = () => {
            if (!timeEl) return;
            const now = new Date();
            const hh = now.getHours().toString().padStart(2, '0');
            const mm = now.getMinutes().toString().padStart(2, '0');
            timeEl.textContent = `${hh}:${mm}`;
        };

        const renderAffirmation = () => {
            const a = affirmations[idx % affirmations.length];
            if (tagEl) tagEl.textContent = a.tag;
            if (textEl) textEl.textContent = a.text;
            if (srcEl) srcEl.textContent = a.source;
            if (tickerEl) tickerEl.textContent = a.text;
        };

        const nextAffirmation = () => {
            idx = (idx + 1) % affirmations.length;
            renderAffirmation();
        };

        updateTime();
        renderAffirmation();
        setInterval(updateTime, 30 * 1000);
        setInterval(nextAffirmation, 10 * 1000);
        if (nextBtn) nextBtn.addEventListener('click', nextAffirmation);

        // Light tilt/drag effect for the virtual phone
        const stage = document.querySelector('[data-role=\"affirmation-stage\"]');
        const rig = document.querySelector('[data-role=\"affirmation-rig\"]');
        if (stage && rig) {
            const maxTilt = 12;
            const resetTilt = () => {
                rig.style.transform = 'rotateX(0deg) rotateY(0deg)';
            };
            stage.addEventListener('pointermove', (e) => {
                const rect = stage.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                const rotY = x * maxTilt;
                const rotX = -y * maxTilt;
                rig.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            });
            stage.addEventListener('pointerleave', resetTilt);
            stage.addEventListener('pointerup', resetTilt);
        }
    })();
})();

const initTabletInteraction = () => {
    console.log('Attempting to initialize tablet interaction...');
    
    const stage = document.getElementById('tabletStage');
    const model = document.getElementById('tabletModel');
    
    console.log('Stage element:', stage);
    console.log('Model element:', model);
    
    if (!stage || !model) {
        console.error('Tablet elements not found! Stage:', stage, 'Model:', model);
        console.log('Available elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        return false;
    }
    
    console.log('Tablet elements found, setting up interaction...');
    
    // Check if elements are visible and interactive
    const stageRect = stage.getBoundingClientRect();
    const modelRect = model.getBoundingClientRect();
    console.log('Stage dimensions:', stageRect);
    console.log('Model dimensions:', modelRect);
    console.log('Stage computed style:', window.getComputedStyle(stage));
    console.log('Model computed style:', window.getComputedStyle(model));

    let rotationX = -8;
    let rotationY = 22;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let activePointerId = null;
    let idleTimer = null;
    let isAutoRotating = false;
    let autoRotateFrame = null;

    const applyTransform = () => {
        const transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        model.style.transform = transform;
        console.log('Applied transform:', transform);
    };

    // Auto-rotate animation
    const autoRotate = () => {
        if (!isAutoRotating) return;
        
        rotationY += 0.3; // Slow rotation speed
        
        // Keep rotation in a reasonable range
        if (rotationY > 360) rotationY -= 360;
        
        applyTransform();
        autoRotateFrame = requestAnimationFrame(autoRotate);
    };

    const startAutoRotate = () => {
        if (isAutoRotating) return;
        console.log('Starting auto-rotate');
        isAutoRotating = true;
        autoRotate();
    };

    const stopAutoRotate = () => {
        if (!isAutoRotating) return;
        console.log('Stopping auto-rotate');
        isAutoRotating = false;
        if (autoRotateFrame) {
            cancelAnimationFrame(autoRotateFrame);
            autoRotateFrame = null;
        }
    };

    const resetIdleTimer = () => {
        stopAutoRotate();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            console.log('Idle detected, starting auto-rotate');
            startAutoRotate();
        }, 3000); // Start auto-rotate after 3 seconds of inactivity
    };

    const handlePointerMove = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        const deltaX = event.clientX - lastPointerX;
        const deltaY = event.clientY - lastPointerY;
        rotationY += deltaX * 0.45;
        rotationX -= deltaY * 0.45;
        rotationX = Math.max(-45, Math.min(45, rotationX));
        applyTransform();
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
    };

    const endPointerDrag = (event) => {
        if (!isDragging || event.pointerId !== activePointerId) {
            return;
        }
        isDragging = false;
        document.body.style.cursor = '';
        activePointerId = null;
        window.removeEventListener('pointermove', handlePointerMove, true);
        window.removeEventListener('pointerup', endPointerDrag, true);
        window.removeEventListener('pointercancel', endPointerDrag, true);
        resetIdleTimer();
    };

    const beginPointerDrag = (event) => {
        if (event.button !== undefined && event.button !== 0) {
            return;
        }
        event.preventDefault();
        resetIdleTimer();
        isDragging = true;
        activePointerId = event.pointerId;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        document.body.style.cursor = 'grabbing';
        window.addEventListener('pointermove', handlePointerMove, true);
        window.addEventListener('pointerup', endPointerDrag, true);
        window.addEventListener('pointercancel', endPointerDrag, true);
    };

    stage.addEventListener('pointerdown', beginPointerDrag, { passive: false });
    model.addEventListener('pointerdown', beginPointerDrag, { passive: false });

    // Add hover effect when not dragging
    stage.addEventListener('mouseenter', () => {
        if (!isDragging) {
            stage.style.cursor = 'grab';
        }
        resetIdleTimer();
    });

    stage.addEventListener('mouseleave', () => {
        stage.style.cursor = '';
    });

    // Apply initial transform
    applyTransform();
    
    // Start the idle timer initially
    resetIdleTimer();
    
    console.log('Tablet interaction fully initialized with simple drag system and auto-rotate!');
    return true;
};

// Try to initialize immediately, then retry when DOM is loaded
if (document.readyState === 'loading') {
    console.log('DOM is still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initTabletInteraction);
} else {
    console.log('DOM already loaded, initializing immediately...');
    initTabletInteraction();
}
