window.OFFLINE_KNOWLEDGE = {
  "categories": [
    {
      "id": "network",
      "title": "Network & Internet Issues",
      "description": "Wi-Fi, slow connections, and device connectivity."
    },
    {
      "id": "peripherals",
      "title": "Printer & Peripheral Problems",
      "description": "Printers, scanners, webcams, and Bluetooth devices."
    },
    {
      "id": "accounts",
      "title": "Accounts & Login Issues",
      "description": "Email sign-in, passwords, and verification codes."
    },
    {
      "id": "performance",
      "title": "Performance & Crashes",
      "description": "Slow devices, freezing, or apps crashing."
    },
    {
      "id": "software",
      "title": "Software & Updates",
      "description": "App installs, downloads, and system updates."
    }
  ],
  "topics": [
    {
      "id": "wifi-cant-connect",
      "categoryId": "network",
      "title": "Wi-Fi won't connect",
      "summary": "Network appears but the device will not join.",
      "keywords": [
        "wifi",
        "wireless",
        "connect",
        "password",
        "network"
      ],
      "reply": "1. Make sure Wi-Fi is turned on (1 min, easy)\nExpected: The Wi-Fi list appears.\nIf yes: Go to step 2.\nIf no: Toggle Airplane mode off and retry.\n\n2. Restart the router (5 min, easy)\nExpected: Router lights return to normal.\nIf yes: Try reconnecting.\nIf no: Contact your internet provider.\n\n3. Forget and rejoin the network (3 min, easy)\nExpected: You can re-enter the Wi-Fi password.\nIf yes: Test a website.\nIf no: Go to step 4.\n\n4. Test a mobile hotspot (3 min, easy)\nExpected: The device connects elsewhere.\nIf yes: The router is likely the issue.\nIf no: The device may need support.",
      "plan": [
        {
          "step": "Check Wi-Fi toggle",
          "rationale": "Confirms the radio is on.",
          "focus": [
            "wifi"
          ]
        },
        {
          "step": "Restart router",
          "rationale": "Clears most network glitches.",
          "focus": [
            "router"
          ]
        },
        {
          "step": "Forget and rejoin",
          "rationale": "Refreshes network credentials.",
          "focus": [
            "password"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Wi-Fi settings",
          "src": "./public/visuals/wifi-settings.svg",
          "alt": "Wi-Fi settings screen"
        }
      ]
    },
    {
      "id": "internet-slow-drops",
      "categoryId": "network",
      "title": "Internet is slow or keeps dropping",
      "summary": "Pages load slowly or the connection cuts out.",
      "keywords": [
        "slow",
        "drops",
        "internet",
        "wifi",
        "disconnect"
      ],
      "reply": "1. Move closer to the router (2 min, easy)\nExpected: Signal strength improves.\nIf yes: Test speed again.\nIf no: Go to step 2.\n\n2. Restart modem and router (5 min, easy)\nExpected: Connection stabilizes after reboot.\nIf yes: You are back online.\nIf no: Go to step 3.\n\n3. Reduce interference (5 min, easy)\nExpected: Fewer disconnects.\nIf yes: Keep the router clear of walls and appliances.\nIf no: Contact your ISP or upgrade the router.",
      "plan": [
        {
          "step": "Improve signal",
          "rationale": "Distance and walls affect Wi-Fi speed.",
          "focus": [
            "signal"
          ]
        },
        {
          "step": "Restart equipment",
          "rationale": "Resets the network path.",
          "focus": [
            "modem",
            "router"
          ]
        },
        {
          "step": "Reduce interference",
          "rationale": "Competing devices can cause drops.",
          "focus": [
            "interference"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Restart router",
          "src": "./public/visuals/router-restart.svg",
          "alt": "Restarting a router"
        }
      ]
    },
    {
      "id": "one-device-offline",
      "categoryId": "network",
      "title": "Only one device is offline",
      "summary": "Other devices work but one device cannot connect.",
      "keywords": [
        "one device",
        "offline",
        "reconnect",
        "wifi"
      ],
      "reply": "1. Confirm other devices are online (2 min, easy)\nExpected: Another device loads a website.\nIf yes: Go to step 2.\nIf no: Use the network outage steps instead.\n\n2. Forget and rejoin Wi-Fi (3 min, easy)\nExpected: The device reconnects successfully.\nIf yes: Test the issue again.\nIf no: Go to step 3.\n\n3. Restart the device (3 min, easy)\nExpected: The device reconnects after reboot.\nIf yes: You are back online.\nIf no: Contact support with the device model.",
      "plan": [
        {
          "step": "Verify other devices",
          "rationale": "Confirms this is not a full outage.",
          "focus": [
            "outage"
          ]
        },
        {
          "step": "Reconnect Wi-Fi",
          "rationale": "Refreshes the device connection.",
          "focus": [
            "wifi"
          ]
        },
        {
          "step": "Restart device",
          "rationale": "Clears temporary network issues.",
          "focus": [
            "restart"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Wi-Fi reconnect",
          "src": "./public/visuals/wifi-settings.svg",
          "alt": "Reconnect to Wi-Fi"
        }
      ]
    },
    {
      "id": "printer-not-responding",
      "categoryId": "peripherals",
      "title": "Printer not responding",
      "summary": "Print jobs stall or nothing comes out.",
      "keywords": [
        "printer",
        "offline",
        "queue",
        "print"
      ],
      "reply": "1. Power cycle the printer (3 min, easy)\nExpected: The printer shows Ready.\nIf yes: Try printing again.\nIf no: Go to step 2.\n\n2. Check the connection (3 min, easy)\nExpected: Printer and device share Wi-Fi or USB is snug.\nIf yes: Go to step 3.\nIf no: Reconnect Wi-Fi or cable.\n\n3. Clear the print queue (5 min, easy)\nExpected: Stuck jobs disappear.\nIf yes: Print a test page.\nIf no: Reinstall the printer software.",
      "plan": [
        {
          "step": "Restart printer",
          "rationale": "Clears stalled print jobs.",
          "focus": [
            "printer"
          ]
        },
        {
          "step": "Verify connection",
          "rationale": "Wi-Fi or USB issues cause most failures.",
          "focus": [
            "connection"
          ]
        },
        {
          "step": "Clear queue",
          "rationale": "Removes stuck print jobs.",
          "focus": [
            "queue"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Printer status",
          "src": "./public/visuals/printer-check.svg",
          "alt": "Printer status check"
        }
      ]
    },
    {
      "id": "scanner-webcam-missing",
      "categoryId": "peripherals",
      "title": "Scanner or webcam not detected",
      "summary": "Camera or scanner is missing in apps.",
      "keywords": [
        "webcam",
        "scanner",
        "camera",
        "not detected"
      ],
      "reply": "1. Close other apps using the camera (2 min, easy)\nExpected: The device appears in the app.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Check privacy permissions (3 min, easy)\nExpected: Camera or scanner is allowed.\nIf yes: Test again.\nIf no: Go to step 3.\n\n3. Reconnect the device (3 min, easy)\nExpected: The device shows up after reconnecting.\nIf yes: You are back.\nIf no: Contact support with the model.",
      "plan": [
        {
          "step": "Close competing apps",
          "rationale": "Only one app can use the camera at a time.",
          "focus": [
            "camera"
          ]
        },
        {
          "step": "Check permissions",
          "rationale": "Privacy settings can block devices.",
          "focus": [
            "permissions"
          ]
        },
        {
          "step": "Reconnect hardware",
          "rationale": "Re-detects the device.",
          "focus": [
            "usb"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Device permissions",
          "src": "./public/visuals/login-lock.svg",
          "alt": "Privacy and permissions"
        }
      ]
    },
    {
      "id": "bluetooth-wont-pair",
      "categoryId": "peripherals",
      "title": "Bluetooth device will not pair",
      "summary": "Headphones or keyboards will not connect.",
      "keywords": [
        "bluetooth",
        "pair",
        "headphones",
        "keyboard"
      ],
      "reply": "1. Toggle Bluetooth off and on (2 min, easy)\nExpected: The device appears in the list.\nIf yes: Try pairing again.\nIf no: Go to step 2.\n\n2. Forget and re-pair the device (3 min, easy)\nExpected: Pairing completes without errors.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Charge and move closer (3 min, easy)\nExpected: Pairing succeeds within a few feet.\nIf yes: You are back.\nIf no: The device may need service.",
      "plan": [
        {
          "step": "Toggle Bluetooth",
          "rationale": "Refreshes the wireless radio.",
          "focus": [
            "bluetooth"
          ]
        },
        {
          "step": "Re-pair device",
          "rationale": "Clears outdated pairing records.",
          "focus": [
            "pairing"
          ]
        },
        {
          "step": "Charge and move closer",
          "rationale": "Low battery blocks pairing.",
          "focus": [
            "battery"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Bluetooth pairing",
          "src": "./public/visuals/bluetooth-pair.svg",
          "alt": "Bluetooth pairing screen"
        }
      ]
    },
    {
      "id": "email-login",
      "categoryId": "accounts",
      "title": "Cannot sign into email",
      "summary": "Password fails or the mailbox will not load.",
      "keywords": [
        "email",
        "login",
        "password",
        "outlook",
        "gmail"
      ],
      "reply": "1. Sign in on webmail (3 min, easy)\nExpected: The account works in a browser.\nIf yes: Go to step 2.\nIf no: Reset the password.\n\n2. Remove and re-add the account (5 min, easy)\nExpected: The mailbox syncs without errors.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Approve security prompts (5 min, easy)\nExpected: A code or approval completes the sign-in.\nIf yes: Test sending an email.\nIf no: Contact support with the error.",
      "plan": [
        {
          "step": "Confirm web login",
          "rationale": "Verifies the password works.",
          "focus": [
            "webmail"
          ]
        },
        {
          "step": "Re-add the account",
          "rationale": "Fixes settings in the mail app.",
          "focus": [
            "account"
          ]
        },
        {
          "step": "Approve security prompts",
          "rationale": "Extra verification may be required.",
          "focus": [
            "2fa"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Login screen",
          "src": "./public/visuals/login-lock.svg",
          "alt": "Login screen"
        }
      ]
    },
    {
      "id": "password-reset",
      "categoryId": "accounts",
      "title": "Password reset not working",
      "summary": "Reset link fails or account says locked.",
      "keywords": [
        "password",
        "reset",
        "locked",
        "account"
      ],
      "reply": "1. Use the official reset page (3 min, easy)\nExpected: You receive a reset code.\nIf yes: Go to step 2.\nIf no: Go to step 3.\n\n2. Set a new password (3 min, easy)\nExpected: You can sign in with the new password.\nIf yes: You are done.\nIf no: Try again after 15 minutes.\n\n3. Check recovery options (5 min, easy)\nExpected: Recovery email or phone is available.\nIf yes: Use that method.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Start the reset",
          "rationale": "Uses the correct recovery flow.",
          "focus": [
            "reset"
          ]
        },
        {
          "step": "Set new password",
          "rationale": "Completes the reset process.",
          "focus": [
            "password"
          ]
        },
        {
          "step": "Verify recovery options",
          "rationale": "Ensures you can regain access.",
          "focus": [
            "recovery"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Account recovery",
          "src": "./public/visuals/login-lock.svg",
          "alt": "Account recovery"
        }
      ]
    },
    {
      "id": "two-factor-code",
      "categoryId": "accounts",
      "title": "Two-factor code not arriving",
      "summary": "Verification code does not show up.",
      "keywords": [
        "2fa",
        "verification",
        "code",
        "mfa"
      ],
      "reply": "1. Check signal and spam folders (2 min, easy)\nExpected: The code arrives within a minute.\nIf yes: Use the code to sign in.\nIf no: Go to step 2.\n\n2. Use a backup method (3 min, easy)\nExpected: You can choose another method.\nIf yes: Sign in and update your options.\nIf no: Go to step 3.\n\n3. Sync device time (2 min, easy)\nExpected: The device time matches the network time.\nIf yes: Try again.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Check delivery",
          "rationale": "Codes can be delayed or filtered.",
          "focus": [
            "sms",
            "email"
          ]
        },
        {
          "step": "Use backup method",
          "rationale": "Backup methods prevent lockouts.",
          "focus": [
            "backup"
          ]
        },
        {
          "step": "Sync device time",
          "rationale": "Incorrect time can break codes.",
          "focus": [
            "time"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Verification code",
          "src": "./public/visuals/login-lock.svg",
          "alt": "Verification prompt"
        }
      ]
    },
    {
      "id": "computer-slow",
      "categoryId": "performance",
      "title": "Computer running slow",
      "summary": "Everything feels laggy or delayed.",
      "keywords": [
        "slow",
        "lag",
        "performance",
        "speed"
      ],
      "reply": "1. Close heavy apps (3 min, easy)\nExpected: The device feels faster.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Free up storage (5-10 min, easy)\nExpected: At least 15 GB free.\nIf yes: Restart and test again.\nIf no: Remove large files or apps.\n\n3. Restart the device (3 min, easy)\nExpected: Performance improves after reboot.\nIf yes: You are back.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Close heavy apps",
          "rationale": "High usage slows everything.",
          "focus": [
            "apps"
          ]
        },
        {
          "step": "Free storage",
          "rationale": "Low storage hurts performance.",
          "focus": [
            "storage"
          ]
        },
        {
          "step": "Restart",
          "rationale": "Clears temporary slowdowns.",
          "focus": [
            "restart"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Performance check",
          "src": "./public/visuals/performance-speed.svg",
          "alt": "Performance meter"
        }
      ]
    },
    {
      "id": "app-crashing",
      "categoryId": "performance",
      "title": "App keeps crashing",
      "summary": "The app closes or freezes repeatedly.",
      "keywords": [
        "app",
        "crash",
        "freeze",
        "close"
      ],
      "reply": "1. Update the app (5 min, easy)\nExpected: The update installs and the app opens.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Restart the device (3 min, easy)\nExpected: The app opens without crashing.\nIf yes: You are back.\nIf no: Go to step 3.\n\n3. Reinstall the app (5 min, easy)\nExpected: The app runs normally.\nIf yes: You are done.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Update the app",
          "rationale": "Updates fix known bugs.",
          "focus": [
            "updates"
          ]
        },
        {
          "step": "Restart device",
          "rationale": "Clears memory conflicts.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Reinstall app",
          "rationale": "Replaces corrupted files.",
          "focus": [
            "reinstall"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "App recovery",
          "src": "./public/visuals/performance-speed.svg",
          "alt": "App recovery"
        }
      ]
    },
    {
      "id": "overheating-freezing",
      "categoryId": "performance",
      "title": "Device freezing or overheating",
      "summary": "Fans are loud or the device is hot to the touch.",
      "keywords": [
        "overheat",
        "hot",
        "freeze",
        "fans"
      ],
      "reply": "1. Move to a hard surface (2 min, easy)\nExpected: Fans calm down.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Close heavy apps (3 min, easy)\nExpected: Temperature drops within minutes.\nIf yes: You are back.\nIf no: Go to step 3.\n\n3. Restart and update (10 min, easy)\nExpected: The device runs cooler after updates.\nIf yes: You are done.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Improve airflow",
          "rationale": "Blocked vents trap heat.",
          "focus": [
            "airflow"
          ]
        },
        {
          "step": "Close heavy apps",
          "rationale": "High CPU usage creates heat.",
          "focus": [
            "cpu"
          ]
        },
        {
          "step": "Update system",
          "rationale": "Updates can fix thermal bugs.",
          "focus": [
            "update"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Cooling tips",
          "src": "./public/visuals/performance-speed.svg",
          "alt": "Cooling tips"
        }
      ]
    },
    {
      "id": "windows-update-stuck",
      "categoryId": "software",
      "title": "System update stuck",
      "summary": "Updates fail, loop, or never finish.",
      "keywords": [
        "update",
        "stuck",
        "windows",
        "install"
      ],
      "reply": "1. Restart and try again (5-10 min, easy)\nExpected: Updates start downloading.\nIf yes: Let them finish.\nIf no: Go to step 2.\n\n2. Run the update troubleshooter (5 min, easy)\nExpected: It reports a fix or completes.\nIf yes: Try again.\nIf no: Go to step 3.\n\n3. Free up storage (10 min, easy)\nExpected: At least 20 GB free.\nIf yes: Retry the update.\nIf no: Move large files or apps.",
      "plan": [
        {
          "step": "Restart and retry",
          "rationale": "Clears temporary update locks.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Run troubleshooter",
          "rationale": "Fixes common update errors.",
          "focus": [
            "troubleshooter"
          ]
        },
        {
          "step": "Free storage",
          "rationale": "Updates need space to install.",
          "focus": [
            "storage"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Update progress",
          "src": "./public/visuals/update-progress.svg",
          "alt": "Update progress"
        }
      ]
    },
    {
      "id": "app-wont-install",
      "categoryId": "software",
      "title": "App will not install",
      "summary": "Install fails or gets stuck.",
      "keywords": [
        "install",
        "app",
        "store",
        "download"
      ],
      "reply": "1. Check storage space (3 min, easy)\nExpected: You have enough free space.\nIf yes: Go to step 2.\nIf no: Free space and retry.\n\n2. Sign out and back in (3 min, easy)\nExpected: The store account refreshes.\nIf yes: Try the install again.\nIf no: Go to step 3.\n\n3. Restart and retry (5 min, easy)\nExpected: The install completes.\nIf yes: You are done.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Check storage",
          "rationale": "No space stops installs.",
          "focus": [
            "storage"
          ]
        },
        {
          "step": "Refresh account",
          "rationale": "Sign-in issues block installs.",
          "focus": [
            "account"
          ]
        },
        {
          "step": "Restart and retry",
          "rationale": "Clears hung installs.",
          "focus": [
            "restart"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Install progress",
          "src": "./public/visuals/update-progress.svg",
          "alt": "Install progress"
        }
      ]
    },
    {
      "id": "downloads-fail",
      "categoryId": "software",
      "title": "Downloads failing or missing",
      "summary": "Files do not appear or fail to save.",
      "keywords": [
        "download",
        "file",
        "browser",
        "missing"
      ],
      "reply": "1. Check the download folder (2 min, easy)\nExpected: The file appears in Downloads.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Try a different browser (3 min, easy)\nExpected: The file downloads successfully.\nIf yes: You are back.\nIf no: Go to step 3.\n\n3. Disable extensions and retry (5 min, easy)\nExpected: Downloads complete normally.\nIf yes: Re-enable extensions one by one.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Check download folder",
          "rationale": "The file may have saved elsewhere.",
          "focus": [
            "downloads"
          ]
        },
        {
          "step": "Try another browser",
          "rationale": "Isolates browser issues.",
          "focus": [
            "browser"
          ]
        },
        {
          "step": "Disable extensions",
          "rationale": "Extensions can block downloads.",
          "focus": [
            "extensions"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Download check",
          "src": "./public/visuals/update-progress.svg",
          "alt": "Download check"
        }
      ]
    }
  ],
  "tips": [
    "Restarting the device fixes many problems quickly.",
    "If more than one device is affected, check the router first.",
    "Write down error messages before contacting support.",
    "Keep devices plugged in during updates to avoid failures."
  ],
  "generic": {
    "id": "general-playbook",
    "title": "General troubleshooting checklist",
    "reply": "1. Restart the device (3 min, easy)\nExpected: The issue goes away after reboot.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Check power and connection (3 min, easy)\nExpected: Power and Wi-Fi are stable.\nIf yes: Go to step 3.\nIf no: Fix the power or network first.\n\n3. Update and capture details (10 min, easy)\nExpected: Updates install or you wrote down the error.\nIf yes: Test again.\nIf no: Send the notes to support.",
    "plan": [
      {
        "step": "Restart and reseat",
        "rationale": "Clears many temporary glitches.",
        "focus": [
          "restart"
        ]
      },
      {
        "step": "Check power and network",
        "rationale": "Confirms the basics are stable.",
        "focus": [
          "power",
          "wifi"
        ]
      },
      {
        "step": "Update and record",
        "rationale": "Updates fix bugs and notes help support.",
        "focus": [
          "updates",
          "notes"
        ]
      }
    ]
  }
}

;
