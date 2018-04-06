<?php

use Illuminate\Database\Seeder;

use App\Models\LInk;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $createdAt = \Carbon\Carbon::now();

        DB::table('categories')->insert([
            [
                'slug'        => 'php',
                'name'        => 'PHP',
                'title'       => 'This is php category',
                'description' => 'PHP 是世界上最好的语言！',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
            [
                'slug'        => 'life',
                'name'        => '生活',
                'title'       => 'This is my life',
                'description' => '生活不止眼前的枸杞，还有保温杯！',
                'created_at'  => $createdAt,
                'updated_at'  => $createdAt,
            ],
        ]);
    }
}
