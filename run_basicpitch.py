from basic_pitch.inference import predict_and_save
import sys

input_audio = sys.argv[1]

predict_and_save(
    [input_audio],
    output_directory="output",
    save_midi=True,
    sonify_midi=False,
    save_model_outputs=False,
    save_notes=False
)
