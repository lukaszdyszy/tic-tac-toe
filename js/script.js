var game = new Vue({
  el: '#game',
  data: {
    status: ['n','n','n','n','n','n','n','n','n'],
    current: 'x',
    play: true,
    block_move: false,
    reset: 'reset',
    ai: true,
    ai_sign: 'o',
    pl_sign: 'x',
    difficulty: 0,
    opened: false
  },
  methods: {
    restart(){
      for(let i=0; i<this.status.length; i++){
        this.$set(this.status, i, 'n');
      }
      if(this.ai_sign == 'o'){this.pl_sign = 'x';}
      else{this.pl_sign = 'o';}
      this.current = 'x';
      this.play = true;
      this.reset = 'reset';
      if(this.current == this.ai_sign && this.ai == true){
        this.ai_move();
      }
    },
    move(nr){
      if(this.status[nr] == 'n' && this.play == true){
        this.$set(this.status, nr, this.current);

        this.check();
      }
    },
    ai_move(){
      let self = this;
      self.block_move = true;
      let move;

      if(move == undefined && self.difficulty > 0){

        for (i = 0; i <= 6; i+=3)
        {
          if((self.status[i] == self.ai_sign)&&(self.status[i] == self.status[i+1])&&(self.status[i+2] == 'n')){move = i+2; i=7;}
          else if((self.status[i] == self.ai_sign)&&(self.status[i] == self.status[i+2])&&(self.status[i+1] == 'n')){move = i+1; i=7;}
          else if((self.status[i+2] == self.ai_sign)&&(self.status[i+2] == self.status[i+1])&&(self.status[i] == 'n')){move = i; i=7;}
        }

        if(move == undefined){
          for (i = 0; i <= 2; i+=1)
          {
            if((self.status[i] == self.ai_sign)&&(self.status[i] == self.status[i+3])&&(self.status[i+6] == 'n')){move = i+6; i=3;}
            else if((self.status[i] == self.ai_sign)&&(self.status[i] == self.status[i+6])&&(self.status[i+3] == 'n')){move = i+3; i=3;}
            else if((self.status[i+6] == self.ai_sign)&&(self.status[i+3] == self.status[i+6])&&(self.status[i] == 'n')){move = i; i=3;}
          }
        }

        if(move == undefined){
          if((self.status[0] == self.ai_sign)&&(self.status[0] == self.status[4])&&(self.status[8] == 'n')){move = 8;}
          else if((self.status[0] == self.ai_sign)&&(self.status[0] == self.status[8])&&(self.status[4] == 'n')){move = 4;}
          else if((self.status[8] == self.ai_sign)&&(self.status[8] == self.status[4])&&(self.status[0] == 'n')){move = 0;}
        }

        if(move == undefined){
          if((self.status[2] == self.ai_sign)&&(self.status[2] == self.status[4])&&(self.status[6] == 'n')){move = 6;}
          else if((self.status[2] == self.ai_sign)&&(self.status[2] == self.status[6])&&(self.status[4] == 'n')){move = 4;}
          else if((self.status[6] == self.ai_sign)&&(self.status[6] == self.status[4])&&(self.status[2] == 'n')){move = 2;}
        }

      }

      if(move == undefined && self.difficulty > 1){

        for (i = 0; i <= 6; i+=3)
        {
          if((self.status[i] == self.pl_sign)&&(self.status[i] == self.status[i+1])&&(self.status[i+2] == 'n')){move = i+2; i=7;}
          else if((self.status[i] == self.pl_sign)&&(self.status[i] == self.status[i+2])&&(self.status[i+1] == 'n')){move = i+1; i=7;}
          else if((self.status[i+2] == self.pl_sign)&&(self.status[i+2] == self.status[i+1])&&(self.status[i] == 'n')){move = i; i=7;}
        }

        if(move == undefined){
          for (i = 0; i <= 2; i+=1)
          {
            if((self.status[i] == self.pl_sign)&&(self.status[i] == self.status[i+3])&&(self.status[i+6] == 'n')){move = i+6; i=3;}
            else if((self.status[i] == self.pl_sign)&&(self.status[i] == self.status[i+6])&&(self.status[i+3] == 'n')){move = i+3; i=3;}
            else if((self.status[i+6] == self.pl_sign)&&(self.status[i+3] == self.status[i+6])&&(self.status[i] == 'n')){move = i; i=3;}
          }
        }

        if(move == undefined){
          if((self.status[0] == self.pl_sign)&&(self.status[0] == self.status[4])&&(self.status[8] == 'n')){move = 8;}
          else if((self.status[0] == self.pl_sign)&&(self.status[0] == self.status[8])&&(self.status[4] == 'n')){move = 4;}
          else if((self.status[8] == self.pl_sign)&&(self.status[8] == self.status[4])&&(self.status[0] == 'n')){move = 0;}
        }

        if(move == undefined){
          if((self.status[2] == self.pl_sign)&&(self.status[2] == self.status[4])&&(self.status[6] == 'n')){move = 6;}
          else if((self.status[2] == self.pl_sign)&&(self.status[2] == self.status[6])&&(self.status[4] == 'n')){move = 4;}
          else if((self.status[6] == self.pl_sign)&&(self.status[6] == self.status[4])&&(self.status[2] == 'n')){move = 2;}
        }

      }

      if(move == undefined){
        do{
          move = Math.round(Math.random() * 8);
        }while(self.status[move] != 'n')
      }

      setTimeout(function(){
        self.move(move);
        self.block_move = false;
      }, 1000);
    },
    check(){
      if((this.status[0] == this.status[1] && this.status[1] == this.status[2] && this.status[0] != 'n')||
      (this.status[3] == this.status[4] && this.status[4] == this.status[5] && this.status[3] != 'n')||
      (this.status[6] == this.status[7] && this.status[7] == this.status[8] && this.status[6] != 'n')||
      (this.status[0] == this.status[3] && this.status[3] == this.status[6] && this.status[0] != 'n')||
      (this.status[1] == this.status[4] && this.status[4] == this.status[7] && this.status[1] != 'n')||
      (this.status[2] == this.status[5] && this.status[5] == this.status[8] && this.status[2] != 'n')||
      (this.status[0] == this.status[4] && this.status[4] == this.status[8] && this.status[0] != 'n')||
      (this.status[2] == this.status[4] && this.status[4] == this.status[6] && this.status[2] != 'n'))
      {
        this.reset = this.current.toUpperCase() + ' won!';
        this.play = false;
      } else {
        let pools = 0;
        for(let i=0; i<this.status.length; i++){
          if(this.status[i] == 'n'){pools++;}
        }
        if(pools == 0){
          this.reset = 'due';
          this.play = false;
        } else {
          if(this.current == 'x'){
            this.current = 'o';
          } else {
            this.current = 'x';
          }

          if(this.current == this.ai_sign && this.ai == true){
            this.ai_move();
          }
        }
      }
    }
  }
});
