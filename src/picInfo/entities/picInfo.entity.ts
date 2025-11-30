import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'pics',
})
export class PicInfo {
  @PrimaryGeneratedColumn()
  pic_id: number;

  @Column()
  pic_name: string;

  @Column()
  pic_url: string;

  @Column()
  userId: number;
}
