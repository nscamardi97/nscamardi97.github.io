import midi
import midi.sequencer
from http.server import BaseHTTPRequestHandler, HTTPServer

hw = midi.sequencer.SequencerHardware()

octave = 5
MIDI_CLIENT = -1
MIDI_PORT   = 0
START_PATCH = 1
BANK_SIZE = 16

supported = ['yoshimi','SunVox']

for client in supported:
    if client in hw._clients:
        MIDI_CLIENT = hw._clients[client].client
        print('Connecting to {}'.format(client))
        break

if MIDI_CLIENT == -1:
    exit('Please install and run a supported client! :)')

class Piano():
    def __init__(self):
        self.current_patch = START_PATCH
        self.seq = midi.sequencer.SequencerWrite()
        self.seq.subscribe_port(MIDI_CLIENT, MIDI_PORT)
        self.seq.start_sequencer()
        self.select_patch(self.current_patch)

    def note_on(self, note, velocity=100):
        self.seq.event_write(midi.NoteOnEvent(velocity=velocity, pitch=note, tick=0), False, False, True)
        print("Note_on:{}".format(note))
    def note_off(self, note):
        self.seq.event_write(midi.NoteOffEvent(velocity=100, pitch=note, tick=0), False, False, True)
        print("Note_off:{}".format(note))

    def select_patch(self, patch):
        if patch < 0 or patch >= BANK_SIZE:
            raise ArgumentError("Invalid Patch")
        self.seq.event_write(midi.ProgramChangeEvent(tick=0, channel=0, data=[patch]), False, False, True)

    def next_patch(self):
        self.current_patch += 1
        self.current_patch %= BANK_SIZE
        self.select_patch(self.current_patch)

piano = Piano()

class RequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)

        self.send_header("Content-type", "text/html")
        self.end_headers()

        parts = self.path.split('/');

        print(self.path)

        print(parts)

        if parts[1] == "":
            index = open('index.html', 'r')
            content = index.read();
            print(content)
            self.wfile.write(content)

        if parts[1] == "js":
            filename = "js/" + parts[2]
            file = open(filename, 'r')
            content = file.read()
            self.wfile.write(content)

        if parts[1] == "css":
            filename = "css/" + parts[2]
            file = open(filename, 'r')
            content = file.read()
            self.wfile.write(content)


        if parts[1] == "js":
            filename = parts[2]
            file = open(filename, 'r')
            content = file.read()
            self.wfile.write(content)
        if parts[1] == "js":
            filename = parts[2]
            file = open(filename, 'r')
            content = file.read()
            self.wfile.write(content)


        if parts[1] == "on":
            print("Note on!")
            note = int(parts[2])
            velocity = int(parts[3])
            piano.note_on(note, velocity)
            self.wfile.write("Note on " + note + " " + velocity)

        if parts[1] == "off":
            print("Note off!")
            note = int(parts[2])
            piano.note_off(note)
            self.wfile.write("Note off " + note)

        if parts[1] == "patch":
            print("Patch!")
            patch = int(parts[2]) - 1
            piano.select_patch(patch)
            self.wfile.write("Patch " + patch)

        return

def run():
    print("Starting server")

    server_address = ("127.0.0.1", 8080)
    httpd = HTTPServer(server_address, RequestHandler)
    print("running server")

    httpd.serve_forever()

run()
