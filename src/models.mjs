/*
* dolphin-2.1-mistral-7b.Q4_K_M.gguf - working
* functionary-small-v2.2.q4_0.gguf - working
* nous-hermes-2-mixtral-8x7b-sft.Q2_K.gguf - working
* tinyllama-1.1b-chat-v1.0.Q2_K.gguf - working
* nsql-llama-2-7B-GGUF.gguf - *NOT* working
* stable-code-3b.Q4_K_M.gguf - *NOT* working
* */

export const listModels = [
  {
    'name': 'dolphin-2.1-mistral-7b.Q4_K_M.gguf',
    'type': 'chat',
    'prompt': 'What is your name?',
    'url': 'https://huggingface.co/TheBloke/dolphin-2.1-mistral-7B-GGUF/resolve/main/dolphin-2.1-mistral-7b.Q4_K_M.gguf?download=true'
  },
  {
    'name': 'functionary-small-v2.2.q4_0.gguf',
    'type': 'chat',
    'prompt': 'What is your name?',
    'url': 'https://huggingface.co/meetkai/functionary-small-v2.2-GGUF/resolve/main/functionary-small-v2.2.q4_0.gguf?download=true'
  },
  //   {
  //     'name': 'nous-hermes-2-mixtral-8x7b-sft.Q2_K.gguf',
  //     'type': 'chat',
  //     'prompt': `<|im_start|>system
  // You are helpful Test AI.<|im_end|>
  // <|im_start|>user
  // What is your name?<|im_end|>
  // <|im_start|>assistant
  // `,
  //     'url': 'https://huggingface.co/TheBloke/Nous-Hermes-2-Mixtral-8x7B-SFT-GGUF/resolve/main/nous-hermes-2-mixtral-8x7b-sft.Q2_K.gguf?download=true'
  //   },
  {
    'name': 'tinyllama-1.1b-chat-v1.0.Q2_K.gguf',
    'type': 'chat',
    'prompt': `<|system|>
You are helpful Test AI.</s>
<|user|>
What is your name?</s>
<|assistant|>`,
    'url': 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q2_K.gguf?download=true'
  },
  {
    'name': 'nsql-llama-2-7B-GGUF.gguf',
    'type': 'completion',
    'prompt': `CREATE TABLE stadium (
    stadium_id number,
    location text,
    name text,
    capacity number,
    highest number,
    lowest number,
    average number
)

CREATE TABLE singer (
    singer_id number,
    name text,
    country text,
    song_name text,
    song_release_year text,
    age number,
    is_male others
)

CREATE TABLE concert (
    concert_id number,
    concert_name text,
    theme text,
    stadium_id text,
    year text
)

CREATE TABLE singer_in_concert (
    concert_id number,
    singer_id text
)

-- Using valid SQLite, answer the following questions for the tables provided above.

-- What is the maximum, the average, and the minimum capacity of stadiums ?

SELECT`,
    'url': 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q2_K.gguf?download=true'
  },
  {
    'name': 'stable-code-3b.Q4_K_M.gguf',
    'type': 'completion',
    'prompt': 'const input = "const arrayFromOneToTwenty = [1, 2, 3,',
    'url': 'https://huggingface.co/TheBloke/stable-code-3b-GGUF/resolve/main/stable-code-3b.Q4_K_M.gguf?download=true'
  }
];
