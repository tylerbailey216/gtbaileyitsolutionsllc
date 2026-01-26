window.OFFLINE_KNOWLEDGE = {
  "categories": [
    {
      "id": "network",
      "title": "Network & Internet (Windows)",
      "description": "Wi-Fi and internet connection help for Windows."
    },
    {
      "id": "performance",
      "title": "Performance & Slowness",
      "description": "When Windows feels slow, laggy, or stuck."
    },
    {
      "id": "accounts",
      "title": "Sign-In & Account Issues",
      "description": "Trouble signing in to Windows or your Microsoft account."
    },
    {
      "id": "peripherals",
      "title": "Printers & Devices",
      "description": "Printer and device connection help."
    },
    {
      "id": "software",
      "title": "Updates & Errors",
      "description": "Windows Update problems and error messages."
    }
  ],
  "topics": [
    {
      "id": "wifi-cant-connect",
      "categoryId": "network",
      "title": "Wi-Fi won't connect",
      "summary": "Beginner-safe steps for when Wi-Fi will not connect.",
      "keywords": [
        "wifi",
        "wireless",
        "connect",
        "password",
        "network"
      ],
      "reply": "1. Turn Wi-Fi off, then on (1 min, easy)\nExpected: The Wi-Fi list appears.\nIf yes: Go to step 2.\nIf no: Make sure Airplane mode is off.\n\n2. Restart your PC (2 min, easy)\nExpected: The computer reconnects after restart.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Restart your router/modem (5 min, easy)\nExpected: Internet lights return to normal.\nIf yes: Try reconnecting.\nIf no: Go to step 4.\n\n4. Forget the network, then reconnect (3 min, easy)\nExpected: You can enter the Wi-Fi password again.\nIf yes: Test a website.\nIf no: Go to step 5.\n\n5. Run the Windows Network Troubleshooter (3 min, easy)\nExpected: Windows reports a fix or gives a message.\nIf yes: Test again.\nIf no: Try a mobile hotspot test or contact support.",
      "plan": [
        {
          "step": "Toggle Wi-Fi",
          "rationale": "Refreshes the wireless connection.",
          "focus": [
            "wifi"
          ]
        },
        {
          "step": "Restart the PC",
          "rationale": "Clears temporary glitches.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Restart the router",
          "rationale": "Resets the internet link.",
          "focus": [
            "router"
          ]
        },
        {
          "step": "Forget and reconnect",
          "rationale": "Refreshes saved network details.",
          "focus": [
            "password"
          ]
        },
        {
          "step": "Use the troubleshooter",
          "rationale": "Windows can fix common network issues.",
          "focus": [
            "troubleshooter"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Wi-Fi settings",
          "src": "./public/visuals/wifi-settings.svg",
          "alt": "Wi-Fi settings"
        },
        {
          "type": "image",
          "title": "Restart router",
          "src": "./public/visuals/router-restart.svg",
          "alt": "Restarting a router"
        }
      ]
    },
    {
      "id": "no-internet",
      "categoryId": "network",
      "title": "Connected but no internet",
      "summary": "Wi-Fi is connected but websites will not load.",
      "keywords": [
        "no internet",
        "connected",
        "wifi",
        "browser",
        "offline"
      ],
      "reply": "1. Check another device (2 min, easy)\nExpected: Another device can load a website.\nIf yes: Go to step 2.\nIf no: The internet may be down.\n\n2. Turn off VPN (1 min, easy)\nExpected: Pages start loading.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Restart your router/modem (5 min, easy)\nExpected: Connection returns after reboot.\nIf yes: You are back online.\nIf no: Go to step 4.\n\n4. Run the Windows Network Troubleshooter (3 min, easy)\nExpected: Windows reports a fix or gives a message.\nIf yes: Test again.\nIf no: Contact support or your internet provider.",
      "plan": [
        {
          "step": "Check another device",
          "rationale": "Confirms if the issue is the PC or the internet.",
          "focus": [
            "device"
          ]
        },
        {
          "step": "Turn off VPN",
          "rationale": "VPNs can block internet access.",
          "focus": [
            "vpn"
          ]
        },
        {
          "step": "Restart the router",
          "rationale": "Refreshes the internet connection.",
          "focus": [
            "router"
          ]
        },
        {
          "step": "Use the troubleshooter",
          "rationale": "Windows can safely fix common issues.",
          "focus": [
            "troubleshooter"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Restart router",
          "src": "./public/visuals/router-restart.svg",
          "alt": "Restart router"
        }
      ]
    },
    {
      "id": "computer-slow",
      "categoryId": "performance",
      "title": "Computer is slow",
      "summary": "Windows feels laggy or takes too long to open things.",
      "keywords": [
        "slow",
        "lag",
        "performance",
        "speed"
      ],
      "reply": "1. Restart your PC (2-3 min, easy)\nExpected: The computer feels faster.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Close extra apps and browser tabs (2 min, easy)\nExpected: The PC responds faster.\nIf yes: You are back.\nIf no: Go to step 3.\n\n3. Check storage space (3 min, easy)\nExpected: You have at least 15 GB free.\nIf yes: Go to step 4.\nIf no: Delete large downloads or empty the recycle bin.\n\n4. Let Windows finish updates (5-15 min, easy)\nExpected: Updates install and the PC speeds up.\nIf yes: You are done.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Restart",
          "rationale": "Clears temporary slowdowns.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Close extra apps",
          "rationale": "Too many apps can slow things down.",
          "focus": [
            "apps"
          ]
        },
        {
          "step": "Free up space",
          "rationale": "Low storage makes Windows sluggish.",
          "focus": [
            "storage"
          ]
        },
        {
          "step": "Install updates",
          "rationale": "Updates can improve performance.",
          "focus": [
            "updates"
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
      "id": "windows-signin",
      "categoryId": "accounts",
      "title": "Can't sign in to Windows",
      "summary": "Password or PIN is not working.",
      "keywords": [
        "sign in",
        "login",
        "password",
        "pin",
        "account"
      ],
      "reply": "1. Check Caps Lock and keyboard layout (1 min, easy)\nExpected: The right keys are being typed.\nIf yes: Try signing in again.\nIf no: Fix the keyboard layout and retry.\n\n2. Restart the PC and try again (2 min, easy)\nExpected: Sign-in works after restart.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Try PIN instead of password (2 min, easy)\nExpected: Windows accepts the PIN.\nIf yes: You are in.\nIf no: Go to step 4.\n\n4. Reset your Microsoft account password (5-10 min, easy)\nExpected: You can sign in with the new password.\nIf yes: You are done.\nIf no: Contact support.\n\nNote: If this is a work or school device, your IT team may need to help.",
      "plan": [
        {
          "step": "Check keyboard",
          "rationale": "Wrong layout or Caps Lock blocks sign-in.",
          "focus": [
            "keyboard"
          ]
        },
        {
          "step": "Restart",
          "rationale": "Clears temporary sign-in issues.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Try the PIN",
          "rationale": "PIN and password are separate checks.",
          "focus": [
            "pin"
          ]
        },
        {
          "step": "Reset password",
          "rationale": "Resets your Microsoft account credentials.",
          "focus": [
            "password"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Sign-in help",
          "src": "./public/visuals/login-lock.svg",
          "alt": "Sign-in screen"
        }
      ]
    },
    {
      "id": "printer-not-responding",
      "categoryId": "peripherals",
      "title": "Printer not responding",
      "summary": "Printer shows offline or nothing prints.",
      "keywords": [
        "printer",
        "offline",
        "print",
        "queue"
      ],
      "reply": "1. Power cycle the printer (3 min, easy)\nExpected: The printer shows Ready.\nIf yes: Try printing again.\nIf no: Go to step 2.\n\n2. Check the cable or Wi-Fi (3 min, easy)\nExpected: The printer is connected to the same Wi-Fi or the USB cable is snug.\nIf yes: Go to step 3.\nIf no: Reconnect and test again.\n\n3. Set it as the default printer (3 min, easy)\nExpected: The printer shows as Default in Settings.\nIf yes: Try printing again.\nIf no: Go to step 4.\n\n4. Clear the print queue (5 min, easy)\nExpected: Stuck jobs disappear.\nIf yes: Print a test page.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Restart the printer",
          "rationale": "Clears stalled print jobs.",
          "focus": [
            "printer"
          ]
        },
        {
          "step": "Check the connection",
          "rationale": "Wi-Fi or USB issues cause most failures.",
          "focus": [
            "connection"
          ]
        },
        {
          "step": "Set as default",
          "rationale": "Ensures Windows sends jobs to the right printer.",
          "focus": [
            "default"
          ]
        },
        {
          "step": "Clear the queue",
          "rationale": "Removes stuck print jobs.",
          "focus": [
            "queue"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Printer check",
          "src": "./public/visuals/printer-check.svg",
          "alt": "Printer status"
        }
      ]
    },
    {
      "id": "windows-update-failed",
      "categoryId": "software",
      "title": "Windows Update failed",
      "summary": "Updates fail, loop, or never finish.",
      "keywords": [
        "update",
        "failed",
        "windows update",
        "stuck"
      ],
      "reply": "1. Restart and try the update again (5-10 min, easy)\nExpected: Updates start or continue.\nIf yes: Let them finish.\nIf no: Go to step 2.\n\n2. Keep the PC plugged in and on power (2 min, easy)\nExpected: Updates continue without pausing.\nIf yes: Let them finish.\nIf no: Go to step 3.\n\n3. Free up space using Storage (5-10 min, easy)\nExpected: At least 20 GB free.\nIf yes: Try the update again.\nIf no: Delete large downloads or empty the recycle bin.\n\n4. Run the Windows Update Troubleshooter (5 min, easy)\nExpected: Windows reports a fix or gives a message.\nIf yes: Try the update again.\nIf no: Go to step 5.\n\n5. Pause updates for a day, then resume (2 min, easy)\nExpected: Updates restart cleanly.\nIf yes: You are done.\nIf no: Contact support.",
      "plan": [
        {
          "step": "Restart and retry",
          "rationale": "Clears temporary update locks.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Use stable power",
          "rationale": "Updates can fail if power drops.",
          "focus": [
            "power"
          ]
        },
        {
          "step": "Free up space",
          "rationale": "Updates need room to install.",
          "focus": [
            "storage"
          ]
        },
        {
          "step": "Use the troubleshooter",
          "rationale": "Windows can fix common update issues.",
          "focus": [
            "troubleshooter"
          ]
        },
        {
          "step": "Pause and resume",
          "rationale": "Gives Windows a clean retry window.",
          "focus": [
            "pause"
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
      "id": "blue-screen-error",
      "categoryId": "software",
      "title": "Blue screen or error message",
      "summary": "Windows shows a blue screen or error message.",
      "keywords": [
        "blue screen",
        "error message",
        "stop code",
        "crash"
      ],
      "reply": "1. Write down the exact error or STOP CODE (1 min, easy)\nExpected: You have the code saved for support.\nIf yes: Go to step 2.\nIf no: Take a photo if possible.\n\n2. Restart the PC (2 min, easy)\nExpected: Windows boots normally.\nIf yes: You are done.\nIf no: Go to step 3.\n\n3. Unplug extra devices (2 min, easy)\nExpected: Windows starts without the error.\nIf yes: Plug devices back in one at a time.\nIf no: Go to step 4.\n\n4. Run Windows Update (5-15 min, easy)\nExpected: Updates install and the error stops.\nIf yes: You are done.\nIf no: Contact support with the error code and what you were doing.",
      "plan": [
        {
          "step": "Record the error",
          "rationale": "The exact code points to the fix.",
          "focus": [
            "error"
          ]
        },
        {
          "step": "Restart",
          "rationale": "Many one-time crashes clear after reboot.",
          "focus": [
            "restart"
          ]
        },
        {
          "step": "Disconnect extras",
          "rationale": "Bad peripherals can trigger crashes.",
          "focus": [
            "usb"
          ]
        },
        {
          "step": "Update Windows",
          "rationale": "Updates can patch known crash bugs.",
          "focus": [
            "updates"
          ]
        }
      ],
      "visuals": [
        {
          "type": "image",
          "title": "Error alert",
          "src": "./public/visuals/alert-error.svg",
          "alt": "Error alert"
        }
      ]
    }
  ],
  "tips": [
    "Take a breath. Most Windows issues are fixable in a few minutes.",
    "Start with the simplest step first. It saves time.",
    "If a step feels confusing, you can stop and contact support.",
    "Write down any exact error message before you reach out."
  ],
  "generic": {
    "id": "general-playbook",
    "title": "Beginner-safe troubleshooting checklist",
    "reply": "1. Restart the device (3 min, easy)\nExpected: The issue goes away after reboot.\nIf yes: You are done.\nIf no: Go to step 2.\n\n2. Check connections and power (3 min, easy)\nExpected: Power and cables look secure.\nIf yes: Go to step 3.\nIf no: Fix the connection first.\n\n3. Let Windows try a built-in fix (5 min, easy)\nExpected: The troubleshooter reports a fix.\nIf yes: Test again.\nIf no: Contact support with what you see.",
    "plan": [
      {
        "step": "Restart",
        "rationale": "Clears many temporary glitches.",
        "focus": [
          "restart"
        ]
      },
      {
        "step": "Check power and cables",
        "rationale": "Loose connections cause many issues.",
        "focus": [
          "power",
          "cable"
        ]
      },
      {
        "step": "Use a Windows troubleshooter",
        "rationale": "Windows can safely fix common problems.",
        "focus": [
          "troubleshooter"
        ]
      }
    ]
  }
}

;
