import random, string

def randCode(length):
    return ''.join(random.choice(string.hexdigits) for n in xrange(length))

codeLength = 6
peopleAU = ["Cathrine"
            ]

peopleGB = ["Charlie",
            "Seb",
            "Paul", #Y
            "Heather",
            "Dan",#mc
            "Judit",
            "Alex",#D
            "Lizzy",#D
            "Alice",
            "Ross",
            "Erika",
            "Toby",
            "Anna",
            "Susie",
            "Lydia",
            "Rona",
            "Nick",#W
            "BEJ",
            "Alasdair",
            "Lynda Andrews",          # lynda.andrews.52@facebook.com
            "Peter Southwood",        # peter.southwood@ps-and-a.eu
            "Peter Williams",         # Peter.Williams@etihadraildb.com
            "Rev'd Mrs Eileen M Webb" # bryleen@aol.com
            "Cora",                   # Cora.McDonald@nailsea.net
            "Paul Easton",            # neweyman@yahoo.com
            "Charles Farran",         # cmdfarran@btinternet.com
            "Pauline Ford",           # fordng@yahoo.com
            "Melanie Hendricks",      # melaniehendricks12@gmail.com
            "Bill Holt",              # holt8df@btinternet.com
            "Lizzy Jones",            # fliz_boz@yahoo.com
            "Jan Munns",              # janlmunns@gmail.com
            "Colin Newnham",          # greentreelizard@gmail.com
            "Brenda Norrish",         # brendanorrish@hotmail.com
            "Jan Palmer",             # ojpalmer@tiscali.co.uk
            "Laura Parsons",          # laura.m.parsons@googlemail.com
            "Linda Richards",         # lindarich58@sky.com
            "Ginny Taylor",           # ginnytaylor@hotmail.co.uk
            "Noz",                    # norinne@ymail.com
            ]
nameCodeList=[]

for name in peopleGB:
    print
    print "for:",name
    #Posted Notes
    #0 NAMe
    #1 Personal or Gift
    #2 index as number
    #3 region AU or GB
    #4 random hex
    code = "PN{0}{1}{2}{3}{4}"
    fourCodes = "\n".join([
"Recently Irina and I made a bit of a web-service-thing that lives at http://postedNot.es"
,"It is a way to send hand written letters to people, without needing to get all the bits in one place. I've explained it better on the actual website I think."
,"We need two things, people to test it, and for more people to know about it. We figured that the best way to do that was to get people to use it. So... here's some codes that'll get you a free letter. There's 2 for you to use, and 2 for you to give away to another 2 people. Because we need to test the whole process, you need to go through the whole thing and pay your $5, but once it's done I'll issue you a refund. (This also stops people from banging in the same code over and over)"
,"We've sent these out to some people in Australia already (we're launching slowly) and some of the ways that people have used them so far are: A 'thanks for having us' note after a dinner party, A 'Thanks for being an awesome mum' note, Someone has sent a letter to his landlord because the landlord didn't have an email address, Someone else sent a poem to a friend as a 'hey, I'm thinking of you'note. You can use them for anything that doesn't need to be there right away."
,""
,"Codes for you:"
,", #  {}"
,", #  {}"
,"and these ones are for you to give away:"
,", #  {}"
,", #  {}"
,""
,"You use these by just adding them to the end of the address after the postcode. Don't worry, the code won't show up on the letter."
,"If you have any thoughts or ideas about how to make it better then let me know. If you like it then tell other people about it!"
])
    p1 = code.format(name[0:3].upper(),"P",1,"AU",randCode(codeLength))
    p2 = code.format(name[0:3].upper(),"P",1,"AU",randCode(codeLength))
    g1 = code.format(name[0:3].upper(),"G",1,"AU",randCode(codeLength))
    g2 = code.format(name[0:3].upper(),"G",1,"AU",randCode(codeLength))
    nameCodeList.append([name, p1, p2, g1, g2])
    print fourCodes.format(p1, p2, g1, g2)

print "\n\n\n\n\n"
print nameCodeList