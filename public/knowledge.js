window.OFFLINE_KNOWLEDGE = {
  "topics": [
    {
      "id": "laptop-power",
      "title": "Laptop will not power on",
      "patterns": [
        "(laptop|notebook|surface|macbook|chromebook).*(won.?t|cannot|doesn'?t).*(turn on|power|start|boot)",
        "(no power|black screen).*laptop"
      ],
      "reply": "Use this quick power check:\n1. Power reset (2 min, easy)\nExpected: A light, fan, or logo appears.\nIf yes: Let it finish booting.\nIf no: Go to step 2.\n\n2. Check charger and outlet (3 min, easy)\nExpected: Charging light turns on or a battery icon appears.\nIf yes: Leave it charging for 15 minutes, then try again.\nIf no: Try a different outlet or charger if available.\n\n3. Screen check and capture details (3 min, easy)\nExpected: You see a logo or faint image, or you recorded the lights/beeps.\nIf yes: Use an external display or send the notes with your help request.\nIf no: Take a photo of any lights/beeps and contact support.",
      "plan": [
        {
          "step": "Power reset",
          "rationale": "Clears temporary power glitches.",
          "focus": [
            "power",
            "restart"
          ]
        },
        {
          "step": "Check charger and outlet",
          "rationale": "Confirms power is reaching the laptop.",
          "focus": [
            "charger",
            "outlet"
          ]
        },
        {
          "step": "Screen check + capture details",
          "rationale": "Separates display issues from power issues and helps support.",
          "focus": [
            "display",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "battery-life",
      "title": "Laptop battery drains fast",
      "patterns": [
        "(battery|power).*(drain|die|low|doesn'?t last)"
      ],
      "reply": "Try this battery tune-up:\n1. Turn on battery saver and lower brightness (2 min, easy)\nExpected: The battery estimate improves.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Close heavy apps and restart (5 min, easy)\nExpected: CPU usage drops and fans calm.\nIf yes: Battery life should improve.\nIf no: Go to step 3.\n\n3. Check battery health and capture details (5 min, easy)\nExpected: You see battery health info.\nIf yes: If health is low, the battery may need service.\nIf no: Note the model and what you tried and contact support.",
      "plan": [
        {
          "step": "Battery saver + brightness",
          "rationale": "Reduces the biggest power drains fast.",
          "focus": [
            "battery saver",
            "brightness"
          ]
        },
        {
          "step": "Close heavy apps",
          "rationale": "Background apps can drain power quickly.",
          "focus": [
            "apps",
            "restart"
          ]
        },
        {
          "step": "Check battery health",
          "rationale": "Shows if the battery is worn out.",
          "focus": [
            "battery health"
          ]
        }
      ]
    },
    {
      "id": "windows-update",
      "title": "Windows update stuck or failing",
      "patterns": [
        "(windows).*(update|install|upgrade).*(stuck|fail|error|loop)"
      ],
      "reply": "Use this update rescue path:\n1. Restart and try Windows Update again (5-10 min, easy)\nExpected: Updates start downloading.\nIf yes: Let them finish and restart.\nIf no: Go to step 2.\n\n2. Run the Windows Update troubleshooter (5 min, easy)\nExpected: It reports a fix or completes.\nIf yes: Check for updates again.\nIf no: Go to step 3.\n\n3. Free space and capture details (10 min, easy)\nExpected: You have at least 20 GB free or you wrote down the error code.\nIf yes: Try the update again and send any error code if it fails.\nIf no: Move large files and try again.",
      "plan": [
        {
          "step": "Restart and retry",
          "rationale": "Clears temporary update locks.",
          "focus": [
            "restart",
            "updates"
          ]
        },
        {
          "step": "Run the troubleshooter",
          "rationale": "Fixes common update errors automatically.",
          "focus": [
            "troubleshooter"
          ]
        },
        {
          "step": "Free space + note errors",
          "rationale": "Updates need space and error codes help support.",
          "focus": [
            "storage",
            "error code"
          ]
        }
      ]
    },
    {
      "id": "mac-performance",
      "title": "Mac running slow or hot",
      "patterns": [
        "(mac|macbook|imac).*(slow|lag|beachball|hot|overheat)"
      ],
      "reply": "Try this Mac speed check:\n1. Restart and close heavy apps (5 min, easy)\nExpected: The Mac feels snappier.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Check Activity Monitor (5 min, easy)\nExpected: One app stands out using CPU.\nIf yes: Quit or update that app.\nIf no: Go to step 3.\n\n3. Update macOS and capture details (10-20 min, easy)\nExpected: Updates install or you noted the issue details.\nIf yes: Test performance again.\nIf no: Note the model and symptoms and contact support.",
      "plan": [
        {
          "step": "Restart + close heavy apps",
          "rationale": "Clears temporary slowdowns.",
          "focus": [
            "restart",
            "apps"
          ]
        },
        {
          "step": "Check Activity Monitor",
          "rationale": "Finds the app using the most resources.",
          "focus": [
            "activity monitor"
          ]
        },
        {
          "step": "Update macOS + note details",
          "rationale": "Updates fix bugs and notes help support.",
          "focus": [
            "update",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "ios-troubles",
      "title": "iPhone or iPad misbehaving",
      "patterns": [
        "iphone",
        "ipad",
        "ios"
      ],
      "reply": "Quick iPhone/iPad reset:\n1. Force restart (2 min, easy)\nExpected: Apple logo appears and it boots.\nIf yes: Test the issue again.\nIf no: Go to step 2.\n\n2. Update iOS or iPadOS (10-20 min, easy)\nExpected: Update installs successfully.\nIf yes: Test again.\nIf no: Go to step 3.\n\n3. Check storage and capture details (5 min, easy)\nExpected: You have a few GB free or you noted the exact issue.\nIf yes: Remove large items or send the notes.\nIf no: Note the model and contact support.",
      "plan": [
        {
          "step": "Force restart",
          "rationale": "Clears many temporary glitches.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Install updates",
          "rationale": "Fixes known bugs and improves stability.",
          "focus": [
            "update"
          ]
        },
        {
          "step": "Free space + note details",
          "rationale": "Low storage causes issues and notes help support.",
          "focus": [
            "storage",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "android-troubles",
      "title": "Android phone or tablet issues",
      "patterns": [
        "(android|pixel|galaxy|oneplus|xiaomi|tablet).*(issue|problem|crash|freeze|boot)"
      ],
      "reply": "Quick Android reset path:\n1. Force restart (2 min, easy)\nExpected: The device reboots normally.\nIf yes: Test the issue again.\nIf no: Go to step 2.\n\n2. Update apps and system (10-20 min, easy)\nExpected: Updates finish without errors.\nIf yes: Test again.\nIf no: Go to step 3.\n\n3. Clear the problem app and capture details (5 min, easy)\nExpected: The app opens or you recorded the error.\nIf yes: You are done.\nIf no: Note the model and contact support.",
      "plan": [
        {
          "step": "Force restart",
          "rationale": "Resets a stuck system.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Update apps and system",
          "rationale": "Updates fix common crashes.",
          "focus": [
            "updates"
          ]
        },
        {
          "step": "Clear app + note details",
          "rationale": "Resets problem apps and helps support.",
          "focus": [
            "apps",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "wifi",
      "title": "Home Wi-Fi problems",
      "patterns": [
        "(wifi|wi-fi|router|mesh|internet|modem|connection|network)"
      ],
      "reply": "Bring Wi-Fi back online:\n1. Power cycle modem and router (5 min, easy)\nExpected: Normal lights return.\nIf yes: Test a website on one device.\nIf no: Contact your ISP.\n\n2. Reconnect one device (5 min, easy)\nExpected: The device reconnects and loads a page.\nIf yes: Reconnect the rest.\nIf no: Go to step 3.\n\n3. Improve signal and capture details (5-10 min, easy)\nExpected: Signal improves or you noted the router model and lights.\nIf yes: Move the router or adjust placement.\nIf no: Send the notes to support.",
      "plan": [
        {
          "step": "Restart modem and router",
          "rationale": "Fixes most home outages quickly.",
          "focus": [
            "modem",
            "router"
          ]
        },
        {
          "step": "Reconnect one device",
          "rationale": "Confirms the network is back online.",
          "focus": [
            "wifi",
            "device"
          ]
        },
        {
          "step": "Improve signal + note details",
          "rationale": "Placement helps performance and notes help support.",
          "focus": [
            "signal",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "printer",
      "title": "Printer or scanner not working",
      "patterns": [
        "(printer|printing|scanner|hp|canon|epson|brother)"
      ],
      "reply": "Get the printer working:\n1. Power cycle printer and device (5 min, easy)\nExpected: Printer shows Ready.\nIf yes: Print a test page.\nIf no: Go to step 2.\n\n2. Confirm connection (5 min, easy)\nExpected: Printer and device are on the same Wi-Fi or USB is snug.\nIf yes: Try printing again.\nIf no: Reconnect Wi-Fi or cable.\n\n3. Reinstall printer and capture details (10 min, easy)\nExpected: The printer installs or you noted the exact error.\nIf yes: Print a test page.\nIf no: Send the notes and model to support.",
      "plan": [
        {
          "step": "Power cycle and test",
          "rationale": "Clears stuck print jobs and resets the printer.",
          "focus": [
            "restart",
            "printer"
          ]
        },
        {
          "step": "Confirm Wi-Fi or USB",
          "rationale": "Connection issues cause most printer failures.",
          "focus": [
            "wifi",
            "usb"
          ]
        },
        {
          "step": "Reinstall + note errors",
          "rationale": "Fresh installs fix drivers and notes help support.",
          "focus": [
            "drivers",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "email-setup",
      "title": "Email setup or login trouble",
      "patterns": [
        "(email|outlook|gmail|yahoo|imap|smtp|login)"
      ],
      "reply": "Use this email sign-in checklist:\n1. Sign in on webmail first (3 min, easy)\nExpected: Your password works in the browser.\nIf yes: Go to step 2.\nIf no: Reset the password.\n\n2. Add the account again (5 min, easy)\nExpected: The app finishes setup without errors.\nIf yes: Send a test email.\nIf no: Go to step 3.\n\n3. Handle security prompts (5 min, easy)\nExpected: A code, approval, or app password works.\nIf yes: You are done.\nIf no: Note the error message and contact support.",
      "plan": [
        {
          "step": "Verify webmail login",
          "rationale": "Confirms the password and account are working.",
          "focus": [
            "login"
          ]
        },
        {
          "step": "Re-add the account",
          "rationale": "Fixes settings issues in the mail app.",
          "focus": [
            "email setup"
          ]
        },
        {
          "step": "Approve security prompts",
          "rationale": "Some providers require extra verification.",
          "focus": [
            "mfa",
            "security"
          ]
        }
      ]
    },
    {
      "id": "software-crash",
      "title": "App or game keeps crashing",
      "patterns": [
        "(app|software|program|game).*(crash|freeze|not responding|stop working)"
      ],
      "reply": "Stabilize the app:\n1. Update the app (5 min, easy)\nExpected: Update installs and the app opens.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Restart and clear space (5-10 min, easy)\nExpected: The device runs smoother.\nIf yes: Try the app again.\nIf no: Go to step 3.\n\n3. Reinstall and capture details (10 min, easy)\nExpected: The app launches or you noted the error.\nIf yes: You are back.\nIf no: Send the error and device details to support.",
      "plan": [
        {
          "step": "Update the app",
          "rationale": "Updates fix many crashes.",
          "focus": [
            "updates"
          ]
        },
        {
          "step": "Restart + free space",
          "rationale": "Low memory and storage can cause crashes.",
          "focus": [
            "restart",
            "storage"
          ]
        },
        {
          "step": "Reinstall + note errors",
          "rationale": "Fresh installs remove corrupted files.",
          "focus": [
            "reinstall",
            "notes"
          ]
        }
      ]
    },
    {
      "id": "backup",
      "title": "Backup and recovery guidance",
      "patterns": [
        "(backup|restore|recover|lost files|data recovery)"
      ],
      "reply": "Keep your data safe:\n1. Turn on built-in backup (10 min, easy)\nExpected: Backup starts or shows as on.\nIf yes: Go to step 2.\nIf no: Try again or ask for help.\n\n2. Make an extra copy (10 min, easy)\nExpected: Files are on an external drive or cloud.\nIf yes: Go to step 3.\nIf no: Add a drive or cloud storage.\n\n3. Test a restore and capture details (5 min, easy)\nExpected: You can open a restored file.\nIf yes: You are protected.\nIf no: Note the error and contact support.",
      "plan": [
        {
          "step": "Enable built-in backup",
          "rationale": "Gives steady protection without extra tools.",
          "focus": [
            "backup"
          ]
        },
        {
          "step": "Keep an extra copy",
          "rationale": "Protects against device failure or ransomware.",
          "focus": [
            "external drive",
            "cloud"
          ]
        },
        {
          "step": "Test a restore",
          "rationale": "Confirms the backup actually works.",
          "focus": [
            "restore"
          ]
        }
      ]
    }
  ],
  "generic": {
    "id": "general-playbook",
    "title": "General troubleshooting checklist",
    "reply": "Try this simple reset path:\n1. Restart the device (3 min, easy)\nExpected: The issue goes away after reboot.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Check power and connection (3 min, easy)\nExpected: Power and Wi-Fi are stable.\nIf yes: Go to step 3.\nIf no: Fix the power or network first.\n\n3. Update and capture details (10 min, easy)\nExpected: Updates install or you wrote down the error.\nIf yes: Test again.\nIf no: Send the notes to support.",
    "plan": [
      {
        "step": "Restart and reseat",
        "rationale": "Clears most temporary glitches.",
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
        "step": "Update + capture details",
        "rationale": "Updates fix bugs and notes help support.",
        "focus": [
          "update",
          "notes"
        ]
      }
    ]
  }
}

;
