#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
use window_vibrancy::{apply_vibrancy, apply_blur, NSVisualEffectMaterial};
use tauri::Manager;
// let window = app.get_window("main").unwrap();

// #[cfg(target_os = "macos")]
// apply_vibrancy(&window, NSVisualEffectMaterial::AppearanceBased).unwrap();

// #[cfg(target_os = "windows")]
// apply_blur(&window, Some((18, 18, 18, 125))).unwrap();

// tauri::Builder::default()
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");

let app = tauri::Builder::default()
              .build(tauri::generate_context!())
              .expect("error while building tauri application");

let window = app.get_window("main").unwrap();

#[cfg(target_os = "macos")]
apply_vibrancy(&window, NSVisualEffectMaterial::AppearanceBased).unwrap();

#[cfg(target_os = "windows")]
apply_blur(&window, Some((18, 18, 18, 125))).unwrap();

app.run(|_app_handle, event| match event {
  tauri::RunEvent::ExitRequested { api, .. } => {
    api.prevent_exit();
  }
  _ => {}
});

}
