export type ProfileAppearance = {
  profile_id: string
  hair_colour: string | null
  hair_length: string | null
  shape_body: string | null
  shape_face: string | null
  size_cup: string | null
  size_hat: string | null
  size_formal_jacket: string | null
  size_formal_jacket_length: string | null
  size_formal_shirt: string | null
  size_formal_shirt_fit: string | null
  size_formal_trouser: string | null
  size_formal_trouser_drop: string | null
  size_formal_trouser_leg: string | null
  size_jacket: string | null
  size_pant: string | null
  size_shoe: string | null
  size_type_age: string | null
  size_type_region: string | null
  size_top: string | null
  size_gloves: string | null
  size_swimwear_top: string | null
  size_swimwear_bottom: string | null
  size_swimwear_cup: string | null
  size_dress: string | null
  skin_type: string | null
  measurement_arm: string | null
  measurement_arm_inside: string | null
  measurement_bust: string | null
  measurement_chest: string | null
  measurement_foot_length: string | null
  measurement_head: string | null
  measurement_height: string | null
  measurement_hip: string | null
  measurement_leg_inside: string | null
  measurement_leg_outside: string | null
  measurement_neck: string | null
  measurement_neck_to_wrist: string | null
  measurement_shoulders: string | null
  measurement_waist: string | null
  measurement_weight: string | null
  brow_colour: string | null
  eye_colour: string | null
  measurement_hand_right_thumb: string | null
  measurement_hand_right_index: string | null
  measurement_hand_right_middle: string | null
  measurement_hand_right_ring: string | null
  measurement_hand_right_pinky: string | null
  measurement_hand_left_thumb: string | null
  measurement_hand_left_index: string | null
  measurement_hand_left_middle: string | null
  measurement_hand_left_ring: string | null
  measurement_hand_left_pinky: string | null
  measurement_ear_helix: string | null
  measurement_ear_forward_helix: string | null
  measurement_ear_flat: string | null
  measurement_ear_conch: string | null
  measurement_ear_tragus: string | null
  measurement_ear_lobe: string | null
  created_at: string
  updated_at: string
}

export type ProfileAppearanceInput = Partial<Omit<ProfileAppearance, 'profile_id' | 'created_at' | 'updated_at'>>
