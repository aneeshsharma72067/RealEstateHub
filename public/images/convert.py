import os
import shutil

def convert_jpeg_to_jpg(source_dir):
  """
  Converts all files ending with "jpeg" to "jpg" in the specified directory.

  Args:
      source_dir (str): The directory containing the files to convert.
  """
  for filename in os.listdir(source_dir):
    if filename.lower().endswith(".jpeg"):
      # Get the full path of the file
      filepath = os.path.join(source_dir, filename)
      # Create the new filename with ".jpg" extension
      new_filename = os.path.splitext(filename)[0] + ".jpg"
      new_filepath = os.path.join(source_dir, new_filename)

      # Use shutil.move to rename the file (effectively conversion)
      shutil.move(filepath, new_filepath)
      print(f"Converted: {filename} -> {new_filename}")

# Example usage: Replace 'path/to/your/directory' with your actual directory
convert_jpeg_to_jpg('D:/My Domain/Web Development/Projects/RealEstateHub/realestatehub/public/images')
