inputText = "message_part_1: I looked out this morning and the sun was gone~|Turned on some music to start my day~|I lost myself in a familiar song~|I closed my eyes and I slipped away~|~|It's more than a feeling, when I hear tha, message_part_2: t old song they used to play (more than a feeling)~|I begin dreaming (more than a feeling)~|'Til I see Marianne walk away~|I see my Marianne walkin' away~|~|So many people have come and gone~|Their fa, message_part_3: ces fade as the years go by~|Yet I still recall as I wander on~|As clear as the sun in the summer sky~|~|It's more than a feeling, when I hear that old song they used to play (more than a feeling)~|I , message_part_4: begin dreaming (more than a feeling)~|'Til I see Marianne walk away~|I see my Marianne walkin' away~|~|Sincerely yours,~|Bede, address_part_1: Michael Gagen~|10 Cranmore St ~|Red Hill~|QLD 4059, address_part_2: agreed:true"

import re

message,address = inputText.split(", address_part_1: ")
# print "split",message,address

print "Message:\n"
message = re.sub("Item Number 1 ","", message)
messageLines = re.sub(", message_part_\d: ","",message).split("~|")
for s in messageLines:
	print s.strip()
print

print "Address:\n"
address = re.sub(", address_part_2: ","", address)
address = re.sub("agreed:true","", address)
addressLines = re.sub(", message_part_\d:","",address).split("~|")
for s in addressLines:
	print s.strip()