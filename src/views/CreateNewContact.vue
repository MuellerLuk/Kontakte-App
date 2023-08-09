<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Neu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
        <ion-item>
              <ion-input required v-model="firstname" placeholder="Vorname"></ion-input>
        </ion-item>
        <ion-item>
              <ion-input required v-model="lastname" placeholder="Nachname"></ion-input>
        </ion-item>
        <ion-item>
               <ion-input required v-model="phonenumber" placeholder="Telefonnummer"></ion-input>
        </ion-item>
        <ion-item>
                <ion-input required v-model="email" placeholder="E-Mail"></ion-input>
        </ion-item>
        <ion-item>
                <ion-input required v-model="birthday" placeholder="Geburtstag"></ion-input>
        </ion-item>

            <!-- Button zum Speichern der Eingabe und zum Abbrechen -->
                <ion-button @click="save" router-link="Home">Speichern</ion-button>
                <ion-button @click="cancel" router-link="Home">Abbrechen</ion-button>

                <!-- Speichern der eingegebenen Dates -->
                <div v-if="showValue">
                  <p>Sie haben eingegeben: {{ firstname }}</p>
                   <p>Sie haben eingegeben: {{ kontakte }}</p>
                </div>
        </ion-list>
      </div>

    </ion-content>

  </ion-page>

</template>

<script>
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Contacts, PhoneType, EmailType } from '@capacitor-community/contacts';

defineComponent({
  methods: {
    navigateToHome() {
      const ionRouter = useIonRouter();
      ionRouter.replace("/HomePage");
    }
  },
});

export default {
components: {
IonInput,
IonButton,
IonContent,
IonHeader,
IonItem,
IonList,
IonPage,
IonTitle,
IonToolbar
},
    data(){
        return{
            firstname: '',
            lastname: '',
            phonenumber: '',
            email: '',
            birthday: '',
            kontakte: [],
            showValue: false
      }
    },
    methods: {
        async save() {
          this.showValue = true;
          //Kontakt-Eigenschaften
          //Test-Commit
          this.kontakte.push(this.firstname);
          this.kontakte.push(this.lastname);
          this.kontakte.push(this.phonenumber);
          this.kontakte.push(this.email);
          this.kontakte.push(this.birthday)

            const res = await Contacts.createContact({
              contact: {
                name: {
                  given: this.firstname,
                  family: this.lastname,
                },
                birthday: {
                  year: 1990,
                  month: 1,
                  day: 1,
                },
                phones: [
                  {
                    type: PhoneType.Mobile,
                    label: 'mobile',
                    number: this.phonenumber,
                  },
                ],
                emails: [
                  {
                    type: EmailType.Work,
                    label: 'work',
                    address: this.email,
                  },
                ],
              },
            });

            console.log(res.contactId);
        
        },
       cancel() {
          this.firstname= '';
          this.lastname = '';
          this.phonenumber= '';
          this.email= '';
          this.birthday= ''
       }
    }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50;

}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}
#container a {
  text-decoration: none;
}
</style>
